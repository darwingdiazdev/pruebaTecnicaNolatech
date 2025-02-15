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

    if (!response.ok) {
      throw new Error("Error en el registro");
    }

    return await response.json(); // Retorna la respuesta del backend
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const loginUser = async (userData) => {
    try {
      console.log("Enviando datos de login:", userData);
  
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      console.log("Respuesta del backend:", response);
  
      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }
  
      const data = await response.json();
      console.log("Usuario autenticado:", data);
      return data;
    } catch (error) {
      console.error("Error en el login:", error);
      throw error;
    }
  };
