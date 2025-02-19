Test para Desarrollador Full Stack (React + Node.js)

Este proyecto es una aplicación web para realizar evaluaciones 360 grados de empleados remotos en una empresa de desarrollo de aplicaciones.

Tecnologías utilizadas

Frontend: React

Backend: Node.js con Express.js

Base de datos: MongoDB (con Mongoose como ODM)

Requisitos previos

Asegúrate de tener instalado:

Node.js

MongoDB

Git

Instalación y configuración

1. Clonar el repositorio

 git clone https://github.com/darwingdiazdev/pruebaTecnicaNolatech.git
 cd nombre-del-repo

2. Configurar el backend

 cd backend
 npm install

Crea un archivo .env en la carpeta backend con las siguientes variables de entorno:

SECRET_KEY = app-development-22052920
PORT = 4000
MONGODB_URI = mongodb://localhost/nolatech


Ejecutar el servidor:

 npm run dev

3. Configurar el frontend

 cd frontend
 npm install

Ejecutar la aplicación:

 npm run dev

La aplicación estará disponible en http://localhost:5173.
