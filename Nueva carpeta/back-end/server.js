const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config.json');
const errorHandler = require('./middlewares/errorHandler');


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
const port = process.env.PORT || 4000;
// Middleware de manejo de errores
app.use(errorHandler);
// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI || config.connectionString)
    .then(() => {
        console.log('Conexión exitosa a la base de datos');

        app.listen(port, () => {
            console.log(`Servidor en ejecución en el puerto: ${port}`);
        });
    })
    .catch(error => {
        console.error('Error de conexión a la base de datos:', error);
    });