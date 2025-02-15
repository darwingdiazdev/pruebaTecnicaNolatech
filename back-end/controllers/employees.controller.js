const express = require('express');
const router = express.Router();
const employeeService = require('../services/employees.service');

const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler(async (req, res) => {
    try {
        const employees = await employeeService.getAll();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener empleados', error: error.message });
    }
}));

module.exports = router;
