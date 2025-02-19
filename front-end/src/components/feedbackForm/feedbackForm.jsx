import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendFeedback } from "../../services/evaluation.service";
import "./FeedbackForm.css"; // Importamos los estilos

export const FeedbackForm = ({ evaluationId }) => {
  const navigate = useNavigate(); // Hook para redireccionar
  const [formData, setFormData] = useState({
    feedbackProvider: "",  
    comments: "",  
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
  
    try {
      await sendFeedback({ evaluationId, ...formData });
      setFormData({ feedbackProvider: "", comments: "" });

      // Redirigir a EvaluationDetail con la ID correcta
      navigate(`/evaluation-list/${evaluationId}`);
    } catch (error) {
      setErrorMessage("Ocurrió un error al enviar el feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="feedback-title">Enviar Feedback</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Quién da el Feedback:</label>
          <input
            type="text"
            name="feedbackProvider"
            className="form-input"
            value={formData.feedbackProvider}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Comentario:</label>
          <textarea
            name="comments"
            className="form-textarea"
            value={formData.comments}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="feedback-button" disabled={loading}>
          {loading ? "Enviando..." : "Enviar Feedback"}
        </button>
      </form>
    </div>
  );
};
