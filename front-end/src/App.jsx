import { Routes, Route } from "react-router-dom";
import { Register } from "./views/register/register";
import { Login } from "./views/login/login";
import { Home } from "./views/home/home";
import { EvaluationDetail } from "./components/evaluationDetail/evaluationDetail";
import { EvaluationEdit } from "./components/evaluationEdit/evaluationEdit";
import { EmployeeEvaluations } from "./components/employeeEvaluations/employeeEvaluations";
import { EmployeeReport } from "./components/employeeReport/employeeReport";

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path="/evaluations/:id" element={<EvaluationDetail />} />
        <Route path="/evaluations/edit/:id" element={<EvaluationEdit />} />
        <Route path="/employees/:employeeId/evaluations" element={<EmployeeEvaluations />} />
        <Route path="/employee-report/:employeeId" element={<EmployeeReport />} />
      </Routes>
    </>
  )
}

export default App