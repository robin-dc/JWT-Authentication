const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    },
},
{
    timestamps: true,
})

module.exports = mongoose.model('User', UserSchema)
