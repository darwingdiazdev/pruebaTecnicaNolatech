const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const User = db.User;

const userService = {
    create: async (userParam) => {
        const { username, password, firstName, lastName } = userParam;

        if (!username || !password || !firstName || !lastName) {
            throw new Error('⚠️ Todos los campos (username, password, firstName, lastName) son obligatorios');
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error(`⚠️ El usuario "${username}" ya está registrado`);
        }

        // Crear nuevo usuario con contraseña hasheada
        const user = new User({
            username,
            password: bcrypt.hashSync(password, 10), // Hashing seguro
            firstName,
            lastName
        });

        await user.save();
        return { message: '✅ Usuario registrado con éxito' };
    },

    authenticate: async ({ username, password }) => {
        if (!username || !password) {
            throw new Error('⚠️ Usuario y contraseña son requeridos');
        }

        // Buscar usuario en la base de datos
        const user = await User.findOne({ username });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error('⚠️ Credenciales incorrectas');
        }

        return { message: '✅ Login exitoso', user: user.toJSON() };
    }
};

module.exports = userService;
