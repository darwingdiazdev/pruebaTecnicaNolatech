const express = require('express');
const router = express.Router();
const userService = require('../services/users.service');

const asyncHandler = fn => (req, res, next) => 
    Promise.resolve(fn(req, res, next)).catch(next);

router.post('/register', asyncHandler(async (req, res) => {
    try {
        console.log('📩 Datos recibidos:', req.body);

        const result = await userService.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}));

router.post('/login', asyncHandler(async (req, res) => {
    try {
        console.log('📩 Intento de login:', req.body);

        const result = await userService.authenticate(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}));

module.exports = router;
