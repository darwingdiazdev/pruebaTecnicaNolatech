import { apiUrl } from "../config/config";

export const getEmployees = async () => {
  try {
    const response = await fetch(`${apiUrl}/employees`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener empleados");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error al obtener empleados:", error);
    throw error;
  }
};

