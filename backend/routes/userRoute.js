const express = require('express');
const route = express.Router();
const {
    registerUser,
    loginUser,
    getMe
} = require('../controllers/user.controller')

route.post('/register', registerUser);
route.post('/login', loginUser);
route.get('/me', getMe);

module.exports = route
