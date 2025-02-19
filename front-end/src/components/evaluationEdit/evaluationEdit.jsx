import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvaluationById, updateEvaluation } from "../../services/evaluation.service";
import Sidebar from "../sidebar/sidebar"; // Importamos Sidebar
import "./EvaluationEdit.css";

export const EvaluationEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    evaluator: "",
    score: "",
    comments: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const data = await getEvaluationById(id);
        setFormData({
          evaluator: data.evaluator,
          score: data.score,
          comments: data.comments || "",
        });
      } catch (error) {
        setError("Error al cargar la evaluación");
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluation();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvaluation(id, formData);
      alert("Evaluación actualizada con éxito");
      navigate(`/evaluation-list/${id}`);
    } catch (error) {
      setError("Error al actualizar la evaluación");
    }
  };

  return (
    <div className="evaluation-edit-container">
      <Sidebar /> {/* Sidebar agregada */}
      
      <div className="evaluation-content">
        <div className="evaluation-edit-card">
          <h2 className="evaluation-title">Editar Evaluación</h2>

          {loading ? (
            <p className="error-message">Cargando evaluación...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <form className="evaluation-form" onSubmit={handleSubmit}>
              <label>Evaluador:</label>
              <input
                type="text"
                name="evaluator"
                value={formData.evaluator}
                onChange={handleChange}
                required
              />

              <label>Puntuación (1-10):</label>
              <input
                type="number"
                name="score"
                value={formData.score}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />

              <label>Comentarios:</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
              />

              <button className="evaluation-button" type="submit">
                Actualizar Evaluación
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
