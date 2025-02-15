import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvaluationById, updateEvaluation } from "../../services/evaluation.service";

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
      navigate(`/evaluations/${id}`);
    } catch (error) {
      setError("Error al actualizar la evaluación");
    }
  };

  if (loading) return <p>Cargando evaluación...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Editar Evaluación</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Evaluador:</label>
          <input
            type="text"
            name="evaluator"
            value={formData.evaluator}
            onChange={handleChange}
            required
          />
        </div>
        <div>
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
        </div>
        <div>
          <label>Comentarios:</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Actualizar Evaluación</button>
      </form>
    </div>
  );
};
