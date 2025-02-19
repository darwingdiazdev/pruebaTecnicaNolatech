import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import "./Sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.user?.role);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token"); // 🔹 Borra el token
    localStorage.removeItem("role");  // 🔹 Borra el rol del usuario
    navigate("/login"); // 🔹 Redirige al login
  };

  return (
    <div className="sidebar">
      <h1 className="sidebar-title">Nolatech</h1>
      <nav className="menu">
        <NavLink to="/employee-list" className="menu-item" activeClassName="active">
          Lista Empleados
        </NavLink>
        <NavLink to="/evaluation-create" className="menu-item" activeClassName="active">
          Nueva Evaluación
        </NavLink>
        <NavLink to="/evaluation-list" className="menu-item" activeClassName="active">
          Todas las Evaluaciones
        </NavLink>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Sidebar;
