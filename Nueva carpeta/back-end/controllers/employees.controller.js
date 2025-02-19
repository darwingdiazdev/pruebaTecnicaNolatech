const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const employeeService = require('../services/employees.service');


// router.get("/", authMiddleware(["Admin", "Manager","Employee"]), async (req, res) => {
router.get("/", async (req, res) => {

    try {
        const employees = await employeeService.getAll();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener empleados", error: error.message });
    }
});

module.exports = router;
