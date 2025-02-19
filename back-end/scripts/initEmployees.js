const mongoose = require("mongoose");
const { Employee } = require('../_helpers/db');// Asegúrate de que el modelo esté bien definido

const employeesData = [
  {
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan.perez@example.com",
    position: "Desarrollador Full Stack",
    department: "Tecnología"
  },
  {
    firstName: "María",
    lastName: "Gómez",
    email: "maria.gomez@example.com",
    position: "Gerente de Recursos Humanos",
    department: "Recursos Humanos",
  },
  {
    firstName: "Carlos",
    lastName: "López",
    email: "carlos.lopez@example.com",
    position: "Analista de Datos",
    department: "Analítica",
  },
  {
    firstName: "Laura",
    lastName: "Martínez",
    email: "laura.martinez@example.com",
    position: "Diseñadora UX/UI",
    department: "Diseño",
  },
  {
    firstName: "Pedro",
    lastName: "Fernández",
    email: "pedro.fernandez@example.com",
    position: "Administrador de Sistemas",
    department: "IT",
  },
];

const initializeEmployees = async () => {
  try {
    // Verificar que la conexión a MongoDB esté activa antes de proceder
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB not connected');
    }

    const count = await Employee.countDocuments()
    if (count > 0) {
      console.log("Ya existen empleados en la base de datos. No se insertarán nuevos datos.");
      return;
    }

    await Employee.insertMany(employeesData);
    console.log("Empleados insertados correctamente en la base de datos.");
  } catch (error) {
    console.error("Error inicializando empleados:", error);
  }
};

module.exports = { initializeEmployees };

