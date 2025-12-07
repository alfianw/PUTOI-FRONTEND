// utils/auth-context.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'superadmin' | 'student';

}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    accessToken: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (
        email: string,
        password: string,
        name: string,
        phoneNumber: string,
        participantType: string,
        identityNumber: string,
        gender: string,
        universityName: string,
        lastEducationField: string,
        majorStudyProgram: string,
        cityOfResidence: string
    ) => Promise<void>;
    signOut: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            setAccessToken(token);
            setUser(JSON.parse(savedUser));
            setLoading(false);
        } else if (token) {

            fetchCurrentUser(token);
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!accessToken) return;

        const interval = setInterval(() => {
            fetchCurrentUser(accessToken);
        }, 30_000); // cek setiap 30 detik

        return () => clearInterval(interval);
    }, [accessToken]);

    const fetchCurrentUser = async (token: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 401) {
                console.log("Token expired → Auto logout");
                signOut();
                return;
            }

            if (response.ok) {
                const data = await response.json();
                setUser({
                    id: String(data.data.id),
                    email: data.data.email,
                    name: data.data.name,
                    role: data.data.roles
                });
            } else {
                signOut();
            }

        } catch (e) {
            signOut();
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.code !== "00") {
                throw new Error(data.message || 'Login gagal');
            }

            // --- letakkan di sini ---
            const token = data.data.token;
            setAccessToken(token);

            console.log("Logged in user roles:", data.data.roles);

            const loggedUser = {
                id: data.data.email,
                email: data.data.email,
                name: data.data.email.split('@')[0],
                role: (data.data.roles as 'superadmin' | 'student')
            };

            setUser(loggedUser);

            // Simpan ke localStorage supaya tetap login saat refresh
            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(loggedUser));
            // --- selesai ---

        } catch (err) {
            throw err;
        }
    };


    // SEMENTARA dinonaktifkan (tidak ada endpoint register di backend)
    const signUp = async (
        email: string,
        password: string,
        name: string,
        phoneNumber: string,
        participantType: string,
        identityNumber: string,
        gender: string,
        universityName: string,
        lastEducationField: string,
        majorStudyProgram: string,
        cityOfResidence: string
    ) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/addUser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    phoneNumber,
                    participantType,
                    identityNumber,
                    gender,
                    universityName,
                    lastEducationField,
                    majorStudyProgram,
                    cityOfResidence
                })
            });

            const data = await response.json();

            if (data.code !== '00') {
                throw new Error(data.message || 'Signup gagal');
            }

            const token = data.data.token;
            setAccessToken(token);

            const loggedUser = {
                id: String(data.data.id),
                email: data.data.email,
                name: data.data.name,
                role: data.data.role.toLowerCase() as 'superadmin' | 'student'
            };

            setUser(loggedUser);

            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(loggedUser));
        } catch (err) {
            throw err;
        }
    };


    const signOut = async () => {
        // Hapus state di React
        setUser(null);
        setAccessToken(null);

        // Hapus data dari localStorage supaya login tidak tersimpan
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');

        // Opsional: redirect ke halaman home
        window.location.href = '#/';
    };

    return (
        <AuthContext.Provider value={{ user, loading, accessToken, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}