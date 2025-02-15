import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEvaluationById } from "../../services/evaluation.service";

export const EvaluationDetail = () => {
  const { id } = useParams();
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const data = await getEvaluationById(id);
        setEvaluation(data);
      } catch (error) {
        setError("Error al cargar la evaluación");
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluation();
  }, [id]);

  if (loading) return <p>Cargando evaluación...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Detalles de la Evaluación</h2>
      <p><strong>Empleado:</strong> {evaluation.employeeId.firstName} {evaluation.employeeId.lastName}</p>
      <p><strong>Evaluador:</strong> {evaluation.evaluator}</p>
      <p><strong>Puntuación:</strong> {evaluation.score}</p>
      <p><strong>Comentarios:</strong> {evaluation.comments || "Sin comentarios"}</p>
    </div>
  );
};
