const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please add a user'],
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    desc: {
        type: String,
        required: [false, 'Please add a desc']
    },
},
{
    timestamps: true,
})


module.exports = mongoose.model('Book', BookSchema)
