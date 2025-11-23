import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";

export function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token") || "";

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (newPassword.length < 6 || confirmPassword.length < 6) {
            setError("Password minimal 6 karakter");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Password dan konfirmasi tidak sama");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await res.json();
            if (data.code === "00") {
                setSuccess("Password berhasil diubah. Anda akan diarahkan ke login...");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setError(data.message || "Gagal mereset password");
            }
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="max-w-sm w-full p-6 border rounded-md text-center bg-white shadow">
                    <p className="text-red-600">Token tidak ditemukan. Pastikan link reset password benar.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="sm:max-w-md w-full max-h-[90vh] overflow-y-auto bg-white p-6 rounded-md shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="relative">
                        <Label htmlFor="newPassword">Password Baru</Label>
                        <Input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength={6}
                            className="pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-9 text-gray-500"
                            onClick={() => setShowNewPassword(prev => !prev)}
                        >
                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="relative">
                        <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                            className="pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-9 text-gray-500"
                            onClick={() => setShowConfirmPassword(prev => !prev)}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {error && <div className="text-red-600 text-sm">{error}</div>}
                    {success && <div className="text-green-600 text-sm">{success}</div>}

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-900 to-blue-600 hover:from-blue-800 hover:to-blue-500"
                        disabled={loading}
                    >
                        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Memproses...</> : "Reset Password"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
