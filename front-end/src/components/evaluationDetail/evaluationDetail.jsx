import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvaluationById } from "../../services/evaluation.service";
import Sidebar from "../sidebar/sidebar";
import { FeedbackForm } from "../feedbackForm/feedbackForm";

import "./EvaluationDetail.css";

const EvaluationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evaluation, setEvaluation] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  
  useEffect(() => {
    if (id) {
      getEvaluationById(id)
        .then((data) => setEvaluation(data))
        .catch((error) => console.error("Error al obtener la evaluación:", error));
    } else {
      console.error("No se encontró el ID de la evaluación.");
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/evaluation-edit/${id}`);
  };

  const handleReport = () => {
    if (evaluation?.employeeId?._id) {
      navigate(`/employee-report/${evaluation.employeeId._id}`);
    } else {
      console.error("El ID del empleado no está definido.");
    }
  };

  return (
    <div className="evaluation-detail-container">
      <Sidebar />

      <div className="evaluation-content">
        {evaluation ? (
          <div className="evaluation-card">
            <h1 className="evaluation-title">Detalle de Evaluación</h1>

            <h2>Información del Empleado</h2>
            <p><strong>Nombre:</strong> {evaluation.employeeId.firstName} {evaluation.employeeId.lastName}</p>
            <p><strong>Posición:</strong> {evaluation.employeeId.position}</p>
            <p><strong>Email:</strong> {evaluation.employeeId.email}</p>
            <p><strong>Teléfono:</strong> {evaluation.employeeId.phone}</p>

            <h2>Detalles de la Evaluación</h2>
            <p><strong>Evaluador:</strong> {evaluation.evaluator}</p>
            <p><strong>Puntuación:</strong> {evaluation.score}</p>
            <p><strong>Comentarios:</strong> {evaluation.comments}</p>

            <h2>Feedback</h2>
            {evaluation.feedbacks.length > 0 ? (
              <ul className="feedback-list">
                {evaluation.feedbacks.map((feedback) => (
                  <li key={feedback._id} className="feedback-item">
                    <p><strong>{feedback.feedbackProvider}:</strong> {feedback.comments}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay feedbacks para esta evaluación.</p>
            )}
            <button className="edit-button" onClick={handleEdit}>Editar Evaluación</button>
            <button
                className="evaluation-button feedback-button"
                onClick={() => setShowFeedbackForm(!showFeedbackForm)}
              >
                {showFeedbackForm ? "Ocultar Formulario de Feedback" : "Agregar Feedback"}
              </button>

              {showFeedbackForm && (
                <div className="feedback-form-container">
                  <FeedbackForm evaluationId={id} />
                </div>
              )}
            <button className="report-button" onClick={handleReport}>Ver Reporte</button>
          </div>
        ) : (
          <p className="loading-text">Cargando evaluación...</p>
        )}
        
      </div>
    </div>
  );
};

export default EvaluationDetail;
