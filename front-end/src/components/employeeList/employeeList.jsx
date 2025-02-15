import { useEffect, useState } from "react";
import { getEmployees } from "../../services/employee.service";

export const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (err) {
        setError("Error al cargar la lista de empleados");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <p>🔄 Cargando empleados...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div>
      <h2>📋 Lista de Empleados</h2>
      {employees.length === 0 ? (
        <p>⚠️ No hay empleados registrados.</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              {employee.firstName} {employee.lastName} - {employee.position}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
