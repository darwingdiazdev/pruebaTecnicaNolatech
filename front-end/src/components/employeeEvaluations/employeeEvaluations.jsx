import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEvaluationsByEmployee } from "../../services/evaluation.service";
import { FeedbackForm } from "../feedbackForm/feedbackForm";

export const EmployeeEvaluations = () => {
  const { employeeId } = useParams();
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const data = await getEvaluationsByEmployee(employeeId);
        setEvaluations(data);
      } catch (error) {
        setError("No se encontraron evaluaciones para este empleado.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluations();
  }, [employeeId]);

  if (loading) return <p>Cargando evaluaciones...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Evaluaciones del Empleado</h2>
      {evaluations.length === 0 ? (
        <p>No hay evaluaciones disponibles</p>
      ) : (
        evaluations.map((evaluation) => (
          <div key={evaluation._id}>
            <p><strong>Evaluador:</strong> {evaluation.evaluator}</p>
            <p><strong>Puntuación:</strong> {evaluation.score}</p>
            <p><strong>Comentarios:</strong> {evaluation.comments}</p>
            <FeedbackForm evaluationId={evaluation._id} />
            <hr />
          </div>
        ))
      )}
    </div>
  );
};
