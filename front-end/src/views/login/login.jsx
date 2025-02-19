import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; 
import { login } from "../../redux/authSlice";
import "./Login.css"; // Importa los estilos

export const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await dispatch(login(formData)).unwrap();
      console.log("Respuesta del backend:", response);
  
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.user.role); // Guarda el rol
  
        // Redirige según el rol
        if (response.user.role === "Admin") {
          navigate("/admin");
        } else if (response.user.role === "Manager") {
          navigate("/manager");
        } else {
          navigate("/employee");
        }
      } else {
        setError("Error en el login. No se recibió el token.");
      }
    } catch (error) {
      setError(error.message || "Error en el login. Intenta nuevamente.");
    }
  };
  
  

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
      <Link to="/register">
        <h6>Crear cuenta</h6>
      </Link>
    </div>
  );
};
