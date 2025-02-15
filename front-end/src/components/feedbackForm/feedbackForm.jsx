import { useState } from "react";
import { sendFeedback } from "../../services/evaluation.service";

export const FeedbackForm = ({ evaluationId }) => {
  const [formData, setFormData] = useState({
    feedbackGiver: "",
    comment: "",
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
      const response = await sendFeedback({ evaluationId, ...formData });
      console.log("✅ Feedback enviado:", response);
      alert("Feedback registrado con éxito");
      setFormData({ feedbackGiver: "", comment: "" });
    } catch (error) {
      console.error("❌ Error al enviar feedback:", error);
      setErrorMessage("❌ Ocurrió un error al enviar el feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Enviar Feedback</h2>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Quién da el Feedback:</label>
          <input
            type="text"
            name="feedbackGiver"
            value={formData.feedbackGiver}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Comentario:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar Feedback"}
        </button>
      </form>
    </div>
  );
};
