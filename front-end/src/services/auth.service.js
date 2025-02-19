import { apiUrl } from "../config/config";

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) throw new Error("Error en la autenticación");

        const data = await response.json();
        localStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const logoutUser = () => {
    localStorage.removeItem("token");
};
