import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEvaluations } from "../../services/evaluation.service";
import Sidebar from "../sidebar/sidebar";
import "./EvaluationList.css"; // Importamos los estilos

const EvaluationsList = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const data = await getAllEvaluations();
        console.log("data", data);
        
        setEvaluations(data);
      } catch (error) {
        setError("Error al cargar las evaluaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluations();
  }, []);

  const handleEvaluationClick = (id) => {
    navigate(`/evaluation-list/${id}`);
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="content">
          <h2 className="evaluations-title">Lista de Evaluaciones</h2>

          {loading ? (
            <p className="loading-message">Cargando evaluaciones...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : evaluations.length === 0 ? (
            <p className="no-evaluations">No hay evaluaciones registradas.</p>
          ) : (
            <ul>
              {evaluations.map((evaluation) => (
                <li
                  key={evaluation._id}
                  onClick={() => handleEvaluationClick(evaluation._id)}
                  style={{ cursor: "pointer" }}
                >
                  <strong>Empleado:</strong> {`${evaluation.employeeId.firstName} ${evaluation.employeeId.lastName}`}{" "}
                  <strong>Puntuación:</strong> {evaluation.score}
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
};

export default EvaluationsList;
