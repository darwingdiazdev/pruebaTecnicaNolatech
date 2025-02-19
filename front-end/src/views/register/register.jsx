import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/authSlice";
import { FaUser, FaLock, FaUserTie, FaUsers } from "react-icons/fa";
import "./Register.css";

const roles = ["Admin", "Manager", "Employee"];

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
  });

  console.log("form", form);
  

  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    try {
      await dispatch(register(form)).unwrap();
      navigate("/login");
    } catch (error) {
      setFormError(error.message || "Error en el registro. Intenta nuevamente.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Registro de Usuario</h2>
        {formError && <p className="error-message">{formError}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaUserTie className="input-icon" />
            <input
              type="text"
              name="firstName"
              placeholder="Nombre"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaUserTie className="input-icon" />
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaUsers className="input-icon" />
            <select name="role" value={form.role} onChange={handleChange} required>
              <option value="">Seleccione un Rol</option>
              {roles.map((rol) => (
                <option key={rol} value={rol}>
                  {rol}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};
