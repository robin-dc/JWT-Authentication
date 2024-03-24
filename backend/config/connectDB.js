const mongoose = require('mongoose');
const colors = require('colors');
const connect = async() => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to Database: ${response.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connect
