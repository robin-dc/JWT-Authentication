const express = require('express')
const booksRouter = express.Router()
const {
    getAllBooks,
    createBook,
    editBook,
    deleteBook
} = require('../controllers/books.controller')

booksRouter.route('/').get(getAllBooks).post(createBook)
booksRouter.route('/:id').patch(editBook).delete(deleteBook)


module.exports = booksRouter
