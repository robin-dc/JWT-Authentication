const express = require('express');
require('dotenv').config()
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const connectDB = require('./config/connectDB')
const booksRouter = require('./routes/booksRoute')
const userRouter = require('./routes/userRoute')
const errorHandler = require('./middleware/errorMiddleware')


// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))

// routes
app.use('/api/books', booksRouter)
app.use('/api/user', userRouter)


app.use(errorHandler)

const port = process.env.PORT
connectDB().then(() =>
    app.listen(port, () => console.log('Server listening on port: ', port))
)
