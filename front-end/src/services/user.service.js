import { apiUrl } from "../config/config";

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Error en el registro");
    }

    return responseData;
  } catch (error) {
    console.error("Error en el frontend:", error);
    throw error;
  }
};
