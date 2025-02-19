const { body, param, validationResult } = require("express-validator");

const validateEvaluation = [
    body("employeeId").notEmpty().withMessage("El ID del empleado es obligatorio"),
    // body("evaluator").notEmpty().withMessage("El nombre del evaluador es obligatorio"),
    body("score").isInt({ min: 1, max: 10 }).withMessage("La puntuación debe estar entre 1 y 10"),
    body("comments").optional().isString().withMessage("Los comentarios deben ser texto"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserRegistration = [
    body("username").notEmpty().withMessage("El nombre de usuario es obligatorio"),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("firstName").notEmpty().withMessage("El nombre es obligatorio"),
    body("lastName").notEmpty().withMessage("El apellido es obligatorio"),
    body("role").notEmpty().withMessage("El rol es obligatorio"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateLogin = [
    body("username").notEmpty().withMessage("El nombre de usuario es obligatorio"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateEvaluation, validateUserRegistration, validateLogin };
