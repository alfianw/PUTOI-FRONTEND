import { projectId, publicAnonKey } from "./supabase/info";

export async function initializeSuperAdmin() {
    try {
        const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/init`,
            {
                method: "POST",
                headers: { Authorization: `Bearer ${publicAnonKey}` },
            }
        );

        if (!response.ok) {
            console.warn("SuperAdmin initialization API not available yet. Please deploy Edge Functions.");
            return null;
        }

        const data = await response.json();

        if (data.credentials) {
            console.log("=".repeat(60));
            console.log("SUPERADMIN ACCOUNT CREATED");
            console.log("=".repeat(60));
            console.log("Email:", data.credentials.email);
            console.log("Password:", data.credentials.password);
            console.log("=".repeat(60));
            console.log("Please save these credentials and change the password after first login.");
        }

        return data;
    } catch {
        return null;
    }
}

// Auto-initialize on first load
if (typeof window !== "undefined") {
    const hasInitialized = localStorage.getItem("superadmin_initialized");
    if (!hasInitialized) {
        initializeSuperAdmin().then(() => {
            localStorage.setItem("superadmin_initialized", "true");
        });
    }
}
