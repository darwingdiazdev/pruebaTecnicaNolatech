import { useState, useEffect } from "react";
import { createEvaluation } from "../../services/evaluation.service";
import { getEmployees } from "../../services/employee.service"; // Obtener empleados

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

  // Cargar empleados al montar el componente
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
      console.log("✅ Evaluación creada:", response);
      alert("Evaluación registrada con éxito");
      setFormData({ employeeId: "", evaluator: "", score: "", comments: "" });
    } catch (error) {
      console.error("❌ Error al registrar evaluación:", error);
      setErrorMessage("❌ Ocurrió un error al registrar la evaluación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Registrar Evaluación</h2>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Empleado:</label>
          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un empleado</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>
        </div>
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
        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Evaluación"}
        </button>
      </form>
    </div>
  );
};
