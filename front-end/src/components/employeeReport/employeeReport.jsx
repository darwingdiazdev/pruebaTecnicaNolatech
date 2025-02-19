import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { downloadReport, getEmployeeReport } from "../../services/evaluation.service";
import Sidebar from "../sidebar/sidebar";
import "./EmployeeReport.css";

export const EmployeeReport = () => {
  const { employeeId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getEmployeeReport(employeeId);
        setReport(data);
      } catch (error) {
        setError("No se pudo generar el reporte.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [employeeId]);

  if (loading) return <p>Cargando reporte...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  
  return (
    <div className="employee-report-container">
      <Sidebar />
      <div className="report-content">
        <h2>Reporte de Evaluación</h2>
        <p><strong>Total de Evaluaciones:</strong> {report.totalEvaluations}</p>
        <p><strong>Puntuación Promedio:</strong> {report.averageScore}</p>
  
        <h3>Detalles de Evaluaciones</h3>
        {report.evaluations.map((evaluation) => (
          <div key={evaluation._id} className="evaluation-card">
            <p><strong>Evaluador:</strong> {evaluation.evaluator}</p>
            <p><strong>Puntuación:</strong> {evaluation.score}</p>
            <p><strong>Comentarios:</strong> {evaluation.comments}</p>
            <hr />
          </div>
        ))}
        <button className="button-csv" onClick={() => downloadReport(employeeId)}>Descargar CSV</button>
      </div>
    </div>
  );
  
};
