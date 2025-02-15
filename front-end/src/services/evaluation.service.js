import { apiUrl } from "../config/config";

export const createEvaluation = async (evaluationData) => {
  try {
    const response = await fetch(`${apiUrl}/evaluations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evaluationData),
    });

    if (!response.ok) {
      throw new Error("❌ Error al crear la evaluación");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
};

export const getEvaluationById = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/evaluations/${id}`);
      if (!response.ok) {
        throw new Error("❌ Error al obtener la evaluación");
      }
      return await response.json();
    } catch (error) {
      console.error("❌ Error:", error);
      throw error;
    }
};

export const updateEvaluation = async (id, evaluationData) => {
    try {
      const response = await fetch(`${apiUrl}/evaluations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(evaluationData),
      });
  
      if (!response.ok) {
        throw new Error("❌ Error al actualizar la evaluación");
      }
  
      return await response.json();
    } catch (error) {
      console.error("❌ Error:", error);
      throw error;
    }
};

export const getEvaluationsByEmployee = async (employeeId) => {
    try {
      const response = await fetch(`${apiUrl}/evaluations/employee/${employeeId}`);
  
      if (!response.ok) {
        throw new Error("❌ No se pudieron obtener las evaluaciones");
      }
  
      return await response.json();
    } catch (error) {
      console.error("❌ Error:", error);
      throw error;
    }
};

export const sendFeedback = async (feedbackData) => {
    try {
      const response = await fetch(`${apiUrl}/evaluations/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });
  
      if (!response.ok) {
        throw new Error("❌ Error al enviar feedback");
      }
  
      return await response.json();
    } catch (error) {
      console.error("❌ Error:", error);
      throw error;
    }
};

export const getEmployeeReport = async (employeeId) => {
    try {
      const response = await fetch(`${apiUrl}/evaluations/reports/employee/${employeeId}`);
  
      if (!response.ok) {
        throw new Error("❌ Error al generar el reporte");
      }
  
      return await response.json();
    } catch (error) {
      console.error("❌ Error:", error);
      throw error;
    }
  };
  
  
