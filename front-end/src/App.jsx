import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./views/login/login";
import { Register } from "./views/register/register";
// import { Home } from "./views/home/home";
// import { EvaluationDetail } from "./components/evaluationDetail";
// import { EvaluationEdit } from "./components/evaluationEdit";
// import { EmployeeEvaluations } from "./components/employeeEvaluations";
// import { EmployeeReport } from "./components/employeeReport";
import DashboardAdmin from "./views/dashboardAdmin/dashboardAdmin";
import DashboardManager from "./views/dashboardManager/dashboardManager";
import DashboardEmployee from "./views/dashboardEmployee/dashboardEmployee";
import Unauthorized from "./views/unauthorized/unauthorized";
import ProtectedRoute from "./components/protectedRoute";
import { EmployeesList } from "./components/employeeList/employeeList";
import { EvaluationForm } from "./components/evaluationForm/evaluationForm";
import EvaluationDetail from "./components/evaluationDetail/evaluationDetail";
import EvaluationsList from "./components/evaluationList/evaluationList";
import { EvaluationEdit } from "./components/evaluationEdit/evaluationEdit";
import { FeedbackForm } from "./components/feedbackForm/feedbackForm.jsx";
import { EmployeeReport } from "./components/employeeReport/employeeReport";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas según el rol */}
      <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/employee-list" element={<EmployeesList/>} />
        <Route path="/evaluation-create" element={<EvaluationForm/>}/>
        <Route path="/evaluation-list" element={<EvaluationsList/>}/>
        <Route path="/evaluation-list/:id" element={<EvaluationDetail/>}/>
        <Route path="/evaluation-edit/:id" element={<EvaluationEdit/>}/>
        <Route path="/evaluation-edit/feedback/:id" element={<FeedbackForm/>}/>
        <Route path="/employee-report/:employeeId" element={<EmployeeReport />} />
       </Route>

      <Route element={<ProtectedRoute allowedRoles={["Manager"]} />}>
        <Route path="/manager" element={<DashboardManager />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["Employee"]} />}>
        <Route path="/employee" element={<DashboardEmployee />} />
      </Route>

      {/* Página de acceso denegado */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Redirigir rutas no encontradas */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
