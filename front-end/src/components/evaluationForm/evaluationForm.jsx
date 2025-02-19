import { useState, useEffect } from "react";
import { createEvaluation } from "../../services/evaluation.service";
import { getEmployees } from "../../services/employee.service";
import Sidebar from "../sidebar/sidebar";
import "./EvaluationForm.css"; // Importamos los estilos

export const EvaluationForm = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    evaluator: "",
    score: "",
    comments: "",
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error al cargar empleados:", error);
      }
    };

    fetchEmployees();
  }, []);

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
      const response = await createEvaluation(formData);
      alert("Evaluación registrada con éxito");
      setFormData({ employeeId: "", evaluator: "", score: "", comments: "" });
    } catch (error) {
      setErrorMessage("Ocurrió un error al registrar la evaluación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="evaluation-container">
      <Sidebar />
      <div className="evaluation-card">
        <h2 className="evaluation-title">Nueva Evaluación</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="evaluation-form">
          <select name="employeeId" value={formData.employeeId} onChange={handleChange} required>
            <option value="">Seleccione un empleado</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="evaluator"
            placeholder="Nombre del evaluador"
            value={formData.evaluator}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="score"
            placeholder="Puntuación (1-10)"
            value={formData.score}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />

          <textarea
            name="comments"
            placeholder="Comentarios"
            value={formData.comments}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Evaluación"}
          </button>
        </form>
      </div>
    </div>
  );
};
