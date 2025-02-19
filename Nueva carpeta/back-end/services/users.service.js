const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require("../config.json");

const db = require('../_helpers/db');
const User = db.User;

const userService = {

    create: async (userParam) => {
        const existingUser = await User.findOne({ username: userParam.username });
        if (existingUser) {
            const error = new Error(`El usuario "${userParam.username}" ya está registrado`);
            error.status = 400;
            throw error;
        }

        const user = new User({
            ...userParam,
            password: bcrypt.hashSync(userParam.password, 10)
        });

        await user.save();
        return { message: "Usuario registrado con éxito" };
    },
    authenticate: async ({ username, password }) => {
        const user = await User.findOne({ username });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            const error = new Error("Credenciales incorrectas");
            error.status = 401;
            throw error;
        }

        const token = jwt.sign({ id: user.id, role: user.role }, config.secret, { expiresIn: "1h" });

        return { message: "Login exitoso", token, user: user.toJSON() };
    },
};

module.exports = userService;
