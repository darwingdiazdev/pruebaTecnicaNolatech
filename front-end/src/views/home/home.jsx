import { EmployeesList } from "../../components/employeeList/employeeList"
import { EvaluationForm } from "../../components/evaluationForm/evaluationForm"

export const Home = () => {
    return(
        <>
             <h1>🏢 Gestión de Empleados</h1>
             <EmployeesList />
             <EvaluationForm/>
        </>
    )
}