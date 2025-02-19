import { apiUrl } from "../config/config";

export const getEmployees = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/employees`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener empleados");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    throw error;
  }
};

