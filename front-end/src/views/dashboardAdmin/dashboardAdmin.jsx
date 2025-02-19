import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import "./DashboardAdmin.css"; // Importa los estilos

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Bienvenido</h1>
       
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardAdmin;
