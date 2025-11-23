import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../utils/auth-context';
import { Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  const [modeState, setModeState] = useState<'signin' | 'signup' | 'forgotPassword'>(mode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [participantType, setParticipantType] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [gender, setGender] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [lastEducationField, setLastEducationField] = useState('');
  const [majorStudyProgram, setMajorStudyProgram] = useState('');
  const [cityOfResidence, setCityOfResidence] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  // Resend OTP states
  const [resendTimer, setResendTimer] = useState(0);

  // Forgot password states
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const { signIn, signUp } = useAuth();

  // API Base URL dari env
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Sync internal mode dengan prop mode dari Navbar
  useEffect(() => {
    setModeState(mode);
    setError('');
  }, [mode]);

  // Timer untuk tombol resend
  useEffect(() => {
    let interval: number;
    if (resendTimer > 0) {
      interval = window.setInterval(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // --- OTP Functions ---
  const sendOtp = async () => {
    setOtpError('');
    setOtpLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/sendOTP`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.code === '00') {
        setOtpSent(true);
        setResendTimer(60);
        alert('OTP berhasil dikirim ke email Anda');
      } else {
        setOtpError(data.message || 'Gagal mengirim OTP');
      }
    } catch (err: any) {
      setOtpError(err.message || 'Terjadi kesalahan');
    } finally {
      setOtpLoading(false);
    }
  };

  const resendOtp = async () => {
    setOtpError('');
    setOtpLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/email/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.code === '00') {
        alert('OTP berhasil dikirim ulang ke email Anda');
        setResendTimer(60);
      } else {
        setOtpError(data.message || 'Gagal mengirim ulang OTP');
      }
    } catch (err: any) {
      setOtpError(err.message || 'Terjadi kesalahan saat kirim ulang OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtp = async () => {
    setOtpError('');
    setOtpLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/email/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (data.code === '00') {
        setOtpVerified(true);
        alert('Email berhasil diverifikasi');
      } else {
        setOtpError(data.message || 'OTP salah');
      }
    } catch (err: any) {
      setOtpError(err.message || 'Terjadi kesalahan');
    } finally {
      setOtpLoading(false);
    }
  };

  // --- Forgot Password ---
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setForgotLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (data.code === '00') {
        setForgotSuccess('Reset password email sent. Silahkan cek email Anda.');
      } else {
        setForgotError(data.message || 'Gagal mengirim reset password email');
      }
    } catch (err: any) {
      setForgotError(err.message || 'Terjadi kesalahan');
    } finally {
      setForgotLoading(false);
    }
  };

  // --- Submit Signin / Signup ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (modeState === 'signin') {
        await signIn(email, password);
      } else {
        if (!otpVerified) {
          setError('Email harus diverifikasi terlebih dahulu');
          setLoading(false);
          return;
        }

        if (!name || !phoneNumber || !participantType || !identityNumber || !gender ||
          !universityName || !lastEducationField || !majorStudyProgram || !cityOfResidence
        ) {
          setError('Semua field wajib diisi');
          setLoading(false);
          return;
        }

        await signUp(
          email,
          password,
          name,
          phoneNumber,
          participantType,
          identityNumber,
          gender,
          universityName,
          lastEducationField,
          majorStudyProgram,
          cityOfResidence
        );
      }

      onClose();

      // Reset semua field
      setEmail(''); setPassword(''); setName(''); setPhoneNumber('');
      setParticipantType(''); setIdentityNumber(''); setGender('');
      setUniversityName(''); setLastEducationField(''); setMajorStudyProgram('');
      setCityOfResidence(''); setOtp(''); setOtpSent(false); setOtpVerified(false);
      setResendTimer(0); setForgotEmail(''); setForgotError(''); setForgotSuccess('');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setModeState(modeState === 'signin' ? 'signup' : 'signin');
    setError('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {modeState === 'signin' ? 'Masuk' : modeState === 'signup' ? 'Daftar Akun' : 'Lupa Password'}
          </DialogTitle>
          <DialogDescription>
            {modeState === 'signin'
              ? 'Masuk ke akun Anda untuk melanjutkan'
              : modeState === 'signup'
                ? 'Buat akun baru untuk mulai belajar'
                : 'Masukkan email Anda untuk menerima link reset password'}
          </DialogDescription>
        </DialogHeader>

        {modeState === 'forgotPassword' ? (
          <form onSubmit={handleForgotPassword} className="space-y-4 mt-2">
            <Label htmlFor="forgotEmail">Email</Label>
            <Input
              id="forgotEmail"
              type="email"
              value={forgotEmail}
              onChange={e => setForgotEmail(e.target.value)}
              required
            />

            {forgotError && <div className="text-sm text-red-600">{forgotError}</div>}
            {forgotSuccess && <div className="text-sm text-green-600">{forgotSuccess}</div>}

            <Button type="submit" className="w-full" disabled={forgotLoading}>
              {forgotLoading ? 'Mengirim...' : 'Kirim Email Reset Password'}
            </Button>

            <div className="text-center text-sm mt-2">
              <button type="button" className="text-blue-900 hover:text-blue-800" onClick={() => setModeState('signin')}>
                Kembali ke Masuk
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Signup fields */}
            {modeState === 'signup' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Contoh: Alfian Widjaya"
                    required
                  />

                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Contoh: email@domain.com"
                    required
                  />

                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    required
                    minLength={6}
                  />

                  <Label htmlFor="phoneNumber">Nomor HP</Label>
                  <Input
                    id="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    required
                  />

                  <Label htmlFor="participantType">Participant Type</Label>
                  <Input
                    id="participantType"
                    type="text"
                    value={participantType}
                    onChange={e => setParticipantType(e.target.value)}
                    placeholder="Contoh: Mahasiswa"
                    required
                  />

                  <Label htmlFor="identityNumber">Nomor KTP</Label>
                  <Input
                    id="identityNumber"
                    type="text"
                    value={identityNumber}
                    onChange={e => setIdentityNumber(e.target.value)}
                    placeholder="16 digit, contoh: 1234567890123456"
                    required
                    maxLength={16}
                    minLength={16}
                  />

                  <Label htmlFor="gender">Jenis Kelamin</Label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    required
                  >
                    <option value="">-- Pilih Gender --</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>

                  <Label htmlFor="universityName">Nama Universitas</Label>
                  <Input
                    id="universityName"
                    type="text"
                    value={universityName}
                    onChange={e => setUniversityName(e.target.value)}
                    placeholder="Contoh: Universitas Indonesia"
                    required
                  />

                  <Label htmlFor="lastEducationField">Bidang Pendidikan Terakhir</Label>
                  <Input
                    id="lastEducationField"
                    type="text"
                    value={lastEducationField}
                    onChange={e => setLastEducationField(e.target.value)}
                    placeholder="Contoh: S1"
                    required
                  />

                  <Label htmlFor="majorStudyProgram">Program Studi</Label>
                  <Input
                    id="majorStudyProgram"
                    type="text"
                    value={majorStudyProgram}
                    onChange={e => setMajorStudyProgram(e.target.value)}
                    placeholder="Contoh: Teknik Informatika"
                    required
                  />

                  <Label htmlFor="cityOfResidence">Kota Domisili</Label>
                  <Input
                    id="cityOfResidence"
                    type="text"
                    value={cityOfResidence}
                    onChange={e => setCityOfResidence(e.target.value)}
                    placeholder="Contoh: Jakarta"
                    required
                  />
                </div>

                {/* OTP Section */}
                <div className="space-y-2">
                  {!otpSent ? (
                    <Button
                      type="button"
                      onClick={() => {
                        // Validasi sebelum kirim OTP
                        if (!email.includes('@')) {
                          setOtpError("Email harus mengandung '@'");
                          return;
                        }
                        if (password.length < 6) {
                          setOtpError("Password minimal 6 karakter");
                          return;
                        }
                        if (identityNumber.length !== 16) {
                          setOtpError("Nomor KTP harus 16 digit");
                          return;
                        }
                        if (!gender) {
                          setOtpError("Jenis kelamin harus dipilih");
                          return;
                        }
                        sendOtp();
                      }}
                      disabled={!email || otpLoading}
                    >
                      {otpLoading ? 'Mengirim OTP...' : 'Send OTP'}
                    </Button>
                  ) : !otpVerified ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Masukkan OTP"
                          value={otp}
                          onChange={e => setOtp(e.target.value)}
                        />
                        <Button
                          type="button"
                          onClick={verifyOtp}
                          disabled={!otp || otpLoading}
                        >
                          {otpLoading ? 'Memverifikasi...' : 'Verify Email'}
                        </Button>
                      </div>

                      <Button
                        type="button"
                        onClick={resendOtp}
                        disabled={resendTimer > 0 || otpLoading}
                        variant="outline"
                        className="text-sm"
                      >
                        {resendTimer > 0 ? `Kirim ulang OTP (${resendTimer}s)` : 'Kirim Ulang OTP'}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-green-600">Email sudah terverifikasi ✅</div>
                  )}
                  {otpError && <div className="text-sm text-red-600">{otpError}</div>}
                </div>
              </>
            )}


            {/* Signin fields */}
            {modeState === 'signin' && (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
              </div>
            )}

            {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

            <Button type="submit" className="w-full bg-gradient-to-r from-blue-900 to-blue-600 hover:from-blue-800 hover:to-blue-500" disabled={loading || (modeState === 'signup' && !otpVerified)}>
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Memproses...</> : modeState === 'signin' ? 'Masuk' : 'Daftar'}
            </Button>

            {modeState === 'signin' && (
              <div className="text-right text-sm mt-1">
                <button type="button" className="text-blue-900 hover:text-blue-800" onClick={() => setModeState('forgotPassword')}>
                  Lupa Password?
                </button>
              </div>
            )}

            <div className="text-center text-sm">
              <span className="text-gray-600">{modeState === 'signin' ? 'Belum punya akun?' : 'Sudah punya akun?'}</span>{' '}
              <button type="button" onClick={toggleMode} className="text-blue-900 hover:text-blue-800">
                {modeState === 'signin' ? 'Daftar' : 'Masuk'}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
