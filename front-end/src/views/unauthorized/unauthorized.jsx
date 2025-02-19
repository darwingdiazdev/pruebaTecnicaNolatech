import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <h1>⛔ Acceso denegado</h1>
      <p>No tienes permisos para ver esta página.</p>
      <Link to="/login">Volver al inicio</Link>
    </div>
  );
};

export default Unauthorized;
