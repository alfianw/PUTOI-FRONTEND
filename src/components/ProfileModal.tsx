// ProfileModal.tsx
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: { email: string } | null;
}

interface UserDetail {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    updateAt: string;
    role: string;
    participantType: string;
    identityNumber: string;
    gender: string;
    universityName: string;
    lastEducationField: string;
    majorStudyProgram: string;
    cityOfResidence: string;
}

export function ProfileModal({ isOpen, onClose, user }: ProfileModalProps) {
    const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [editing, setEditing] = useState(false);

    const [editingEmail, setEditingEmail] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);

    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [resendTimer, setResendTimer] = useState(0);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [form, setForm] = useState({
        name: "",
        phoneNumber: "",
        participantType: "",
        identityNumber: "",
        gender: "",
        universityName: "",
        lastEducationField: "",
        majorStudyProgram: "",
        cityOfResidence: "",
        email: "",
        oldPassword: "",
        newPassword: "",
    });

    // Reset state saat modal ditutup
    useEffect(() => {
        if (!isOpen) {
            setUserDetail(null);
            setError(null);
            setSuccessMessage(null);
            setEditing(false);
            setEditingEmail(false);
            setEditingPassword(false);
            setOtpSent(false);
            setOtp("");
            setResendTimer(0);
            setForm({
                name: "",
                phoneNumber: "",
                participantType: "",
                identityNumber: "",
                gender: "",
                universityName: "",
                lastEducationField: "",
                majorStudyProgram: "",
                cityOfResidence: "",
                email: "",
                oldPassword: "",
                newPassword: "",
            });
        }
    }, [isOpen]);

    // Fetch user detail saat modal terbuka
    useEffect(() => {
        if (!isOpen || !user?.email) return;

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            setError("Access token tidak tersedia. Silakan login kembali.");
            return;
        }

        const controller = new AbortController();

        const fetchUserDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/api/users/get-detail-by-email`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ email: user.email }),
                    signal: controller.signal,
                });

                const text = await response.text();
                let data;
                try {
                    data = text ? JSON.parse(text) : {};
                } catch (jsonErr) {
                    throw new Error("Gagal parse JSON: " + jsonErr);
                }

                if (data.code === "00") {
                    setUserDetail(data.data);
                    setForm(prev => ({
                        ...prev,
                        name: data.data.name || "",
                        phoneNumber: data.data.phoneNumber || "",
                        participantType: data.data.participantType || "",
                        identityNumber: data.data.identityNumber || "",
                        gender: data.data.gender || "",
                        universityName: data.data.universityName || "",
                        lastEducationField: data.data.lastEducationField || "",
                        majorStudyProgram: data.data.majorStudyProgram || "",
                        cityOfResidence: data.data.cityOfResidence || "",
                        email: data.data.email || "",
                    }));
                } else {
                    setError(data.message || "Gagal memuat detail user");
                }
            } catch (err: any) {
                if (err.name === "AbortError") return;
                setError(err.message || "Terjadi kesalahan saat mengambil data user");
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetail();
        return () => controller.abort();
    }, [isOpen, user?.email, API_BASE_URL]);

    // Timer untuk resend OTP
    useEffect(() => {
        if (resendTimer <= 0) return;
        const interval = setInterval(() => {
            setResendTimer(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [resendTimer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = async () => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return;

        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const payload = { ...form }; // Fix duplicate email
            const response = await fetch(`${API_BASE_URL}/api/users/update-data-user`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                setError(`Gagal update data. Status: ${response.status}`);
            } else {
                const text = await response.text();
                const data = text ? JSON.parse(text) : {};
                if (data.code === "00") {
                    setUserDetail(data.data);
                    setSuccessMessage("Data berhasil diperbarui!");
                    setEditing(false);
                } else {
                    setError(data.message || "Gagal update data");
                }
            }
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan saat update data");
        } finally {
            setLoading(false);
        }
    };

    const handleSendOTP = async () => {
        if (!form.email) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/sendOTP`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email }),
            });
            const text = await response.text();
            const data = text ? JSON.parse(text) : {};
            if (data.code === "00") {
                setOtpSent(true);
                setSuccessMessage("OTP berhasil dikirim!");
                setResendTimer(60); // 1 menit delay
            } else {
                setError(data.message || "Gagal mengirim OTP");
            }
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan saat mengirim OTP");
        } finally {
            setLoading(false);
        }
    };

const handleVerifyEmail = async () => {
    if (!form.email || !otp) return;
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
        // 1. Verifikasi OTP
        const verifyResponse = await fetch(`${API_BASE_URL}/api/email/verify-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: form.email, otp }),
        });
        const verifyText = await verifyResponse.text();
        const verifyData = verifyText ? JSON.parse(verifyText) : {};

        if (verifyData.code !== "00") {
            setError(verifyData.message || "OTP salah atau kadaluarsa");
            return;
        }

        setSuccessMessage("OTP berhasil diverifikasi!");
        // 2. Simpan email baru ke database
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            setError("Access token tidak tersedia. Silakan login kembali.");
            return;
        }

        const payload = {
            email: form.email,
            oldPassword: "", // tidak update password
            newPassword: "",
        };

        const updateResponse = await fetch(`${API_BASE_URL}/api/users/update-password-email`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
        });

        const updateText = await updateResponse.text();
        const updateData = updateText ? JSON.parse(updateText) : {};

        if (updateData.code === "00") {
            // 3. Logout user
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setUserDetail(null);
            setEditingEmail(false);

            window.location.href = "/login"; // redirect ke login
        } else {
            setError(updateData.message || "Gagal update email di database");
        }

    } catch (err: any) {
        setError(err.message || "Terjadi kesalahan saat verifikasi OTP");
    } finally {
        setLoading(false);
    }
};


    const handleResendOTP = async () => {
        if (resendTimer > 0) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/api/email/resend-verification`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email }),
            });
            const text = await response.text();
            const data = text ? JSON.parse(text) : {};
            if (data.code === "00") {
                setSuccessMessage("OTP berhasil dikirim ulang!");
                setResendTimer(60);
            } else {
                setError(data.message || "Gagal mengirim OTP ulang");
            }
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan saat resend OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async () => {
        const accessToken = localStorage.getItem("accessToken"); // <-- ambil token di sini
        if (!accessToken) {
            setError("Access token tidak tersedia. Silakan login kembali.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const payload: any = {};
            if (form.oldPassword) payload.oldPassword = form.oldPassword;
            if (form.newPassword) payload.newPassword = form.newPassword;

            const response = await fetch(`${API_BASE_URL}/api/users/update-password-email`, {
                method: "PUT", // pastikan sama dengan backend
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(payload),
            });

            const text = await response.text();
            const data = text ? JSON.parse(text) : {};
            if (data.code === "00") {
                setSuccessMessage(data.message);

                // Logout user setelah password berhasil diupdate
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken"); // kalau pakai refresh token juga
                setUserDetail(null); // reset user state
                setEditingPassword(false);

                // Redirect ke login page
                window.location.href = "/login"; // ganti sesuai route login
            } else {
                setError(data.message || "Gagal update password");
            }
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan saat update password");
        } finally {
            setLoading(false);
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg p-6 relative overflow-auto w-[50vw] max-w-[600px] max-h-[90vh] text-[16px] sm:w-[90vw]">
                <button
                    className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
                    onClick={onClose}
                    type="button"
                >
                    <X className="w-4 h-4" />
                </button>

                <h2 className="text-[20px] font-bold mb-4 text-left">Profile Detail</h2>

                {loading && <p>Loading...</p>}
                {error && (
                    <div className="text-red-600 bg-red-50 p-3 rounded-lg">
                        {error}
                    </div>
                )}
                {successMessage && <div className="text-green-600">{successMessage}</div>}


                {userDetail && !editingEmail && !editingPassword && (
                    <>
                        {/* Form Data Diri */}
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            {([
                                { label: "Nama", name: "name" },
                                { label: "Phone Number", name: "phoneNumber" },
                                { label: "Participant Type", name: "participantType" },
                                { label: "Identity Number", name: "identityNumber" },
                                { label: "University", name: "universityName" },
                                { label: "Last Education Field", name: "lastEducationField" },
                                { label: "Major Study Program", name: "majorStudyProgram" },
                                { label: "City of Residence", name: "cityOfResidence" },
                            ] as { label: string; name: keyof typeof form }[]).map((field) => (
                                <div key={field.name}>
                                    <label className="block text-left">{field.label}:</label>
                                    <input
                                        name={field.name}
                                        value={form[field.name]}
                                        onChange={handleChange}
                                        className="w-full border rounded px-2 py-1"
                                        disabled={!editing}
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="block text-left">Gender:</label>
                                <select
                                    name="gender"
                                    value={form.gender}
                                    onChange={handleChange}
                                    className="w-full border rounded px-2 py-1"
                                    disabled={!editing}
                                >
                                    <option value="">-- Pilih Gender --</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2 justify-end">
                                {!editing ? (
                                    <Button type="button" onClick={() => setEditing(true)}>Edit Data</Button>
                                ) : (
                                    <>
                                        <Button type="button" variant="outline" onClick={() => setEditing(false)}>Batal</Button>
                                        <Button type="button" onClick={handleSaveProfile}>Simpan</Button>
                                    </>
                                )}
                                <Button type="button" onClick={() => setEditingEmail(true)}>Edit Email</Button>
                                <Button type="button" onClick={() => setEditingPassword(true)}>Edit Password</Button>
                            </div>
                        </form>
                    </>
                )}

                {/* Edit Email */}
                {/* Edit Email */}
                {editingEmail && (
                    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                        <label className="block text-left">Email Baru:</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                        <div className="flex gap-2 mt-2">
                            {!otpSent && (
                                <>
                                    <Button type="button" onClick={handleSendOTP}>Kirim OTP</Button>
                                    <Button type="button" variant="outline" onClick={() => setEditingEmail(false)}>Batal</Button>
                                </>
                            )}
                            {otpSent && (
                                <>
                                    <label className="block text-left">Masukkan OTP:</label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full border rounded px-2 py-1"
                                    />
                                    <Button type="button" onClick={handleVerifyEmail}>Verifikasi OTP</Button>
                                    <Button type="button" onClick={handleResendOTP} disabled={resendTimer > 0}>
                                        {resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : "Kirim Ulang OTP"}
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => setEditingEmail(false)}>Batal</Button>
                                </>
                            )}
                        </div>
                    </form>
                )}

                {/* Edit Password */}
                {editingPassword && (
                    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                        <label className="block text-left">Password Lama:</label>
                        <input
                            type="password"
                            name="oldPassword"
                            value={form.oldPassword}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                        <label className="block text-left">Password Baru:</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                        <div className="flex gap-2 mt-2 justify-end">
                            <Button type="button" onClick={handleUpdatePassword}>Simpan</Button>
                            <Button type="button" variant="outline" onClick={() => setEditingPassword(false)}>Batal</Button>
                        </div>
                    </form>
                )}

            </div>
        </div>
    );
}
