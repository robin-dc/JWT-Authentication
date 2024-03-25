const express = require('express');
const route = express.Router();
const {
    registerUser,
    loginUser,
    getMe
} = require('../controllers/user.controller')
const protect = require('../middleware/authMiddleware')

route.post('/register', registerUser);
route.post('/login', loginUser);
route.get('/me', protect, getMe);

module.exports = route
