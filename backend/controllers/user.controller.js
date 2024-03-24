const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')

// @desc Register user
// @route /api/user/register
// @access public

const registerUser = asyncHandler(async(req,res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Invalid credentials')
    }

    const user = await User.findOne({email: email})

    if(user){
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const protectedUser = {
        name,
        email,
        password: hashedPassword
    }
    const newUser = await User.create(protectedUser)

    res.status(201).send({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
    })
})

// @desc Login user
// @route /api/user/login
// @access public
const loginUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body

    if(!email || !password) {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    const user = await User.findOne({email})
    const isCorrectPassword = await bcrypt.compare(password, user.password)

    if(!user && !isCorrectPassword){
        res.status(400)
        throw new Error('Incorrect credentials')
    }

    res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email
    })
})

// @desc Get User Details
// @route /api/user/me
// @access private
const getMe = asyncHandler(async(req,res) => {

})


module.exports = {
    getMe,
    registerUser,
    loginUser
}
