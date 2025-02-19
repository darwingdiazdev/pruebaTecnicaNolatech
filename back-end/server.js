const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler');
const { initializeEmployees } = require('./scripts/initEmployees');

// 🔹 Usa `express.json()` en lugar de `bodyParser.json()`
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
app.use(cors());
app.options('*', cors());

// Importar controladores
app.use('/auth', require('./controllers/users.controller'));
app.use('/employees', require('./controllers/employees.controller'));
app.use('/evaluations', require('./controllers/evaluations.controller'));

// Configurar puerto
const port = process.env.PORT;
// Middleware de manejo de errores
app.use(errorHandler);
// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
    console.log('Conexión exitosa a la base de datos');

    await initializeEmployees();
    
    app.listen(process.env.PORT, () => {
        console.log(`Servidor en ejecución en el puerto: ${process.env.PORT}`);
    });
})
.catch(error => {
    console.error('Error de conexión a la base de datos:', error);
    });