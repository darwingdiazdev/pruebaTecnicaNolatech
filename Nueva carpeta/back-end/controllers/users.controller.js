const express = require('express');
const router = express.Router();
const userService = require('../services/users.service');
const asyncHandler = require('../middlewares/asyncHandler');
const { validateUserRegistration, validateLogin } = require('../middlewares/validateRequest')

router.post('/register',validateUserRegistration, asyncHandler(async (req, res) => {
    try {
        const result = await userService.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}));

router.post('/login', validateLogin, asyncHandler(async (req, res) => {
    try {
        const result = await userService.authenticate(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}));

module.exports = router;
