const db = require('../_helpers/db');
const Employee = db.Employee;

const employeeService = {
    getAll: async () => {
        return await Employee.find(); //Obtiene todos los empleados
    }
};

module.exports = employeeService;
