import { apiUrl } from "../config/config";

export const createEvaluation = async (evaluationData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/evaluations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evaluationData),
    });

    if (!response.ok) {
      throw new Error("Error al crear la evaluación");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllEvaluations = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/evaluations`, {
      method: 'GET',
      headers: {
          Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("Error al obtener las evaluaciones");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};


export const getEvaluationById = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/evaluations/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Error al obtener la evaluación");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
};

export const updateEvaluation = async (id, evaluationData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/evaluations/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(evaluationData),
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar la evaluación");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
};

export const getEvaluationsByEmployee = async (employeeId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/evaluations/employee/${employeeId}`,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error("No se pudieron obtener las evaluaciones");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
};

export const sendFeedback = async (feedbackData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/evaluations/feedback`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });
  
      if (!response.ok) {
        throw new Error("Error al enviar feedback");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
};


export const getEmployeeReport = async (employeeId) => {
  const token = localStorage.getItem('token');

  if (!employeeId) {
    throw new Error("ID de empleado no proporcionado");
  }

  try {
    const response = await fetch(`${apiUrl}/evaluations/reports/employee/${employeeId}`,{
      method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`
          }
    });

    if (!response.ok) {
      throw new Error("Error al generar el reporte");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const downloadReport = async (employeeId) => {
  const token = localStorage.getItem('token');

  try {
      const response = await fetch(`${apiUrl}/evaluations/reports/csv/employee/${employeeId}`, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      if (!response.ok) throw new Error("No se pudo descargar el archivo");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `employee_report_${employeeId}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
  } catch (error) {
      console.error("Error al descargar el reporte:", error);
  }
};
  
