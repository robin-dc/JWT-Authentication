const express = require('express')
const booksRouter = express.Router()
const {
    getAllBooks,
    createBook,
    editBook,
    deleteBook
} = require('../controllers/books.controller')
const protect = require('../middleware/authMiddleware')

booksRouter.route('/').get(protect, getAllBooks).post(protect, createBook)
booksRouter.route('/:id').patch(protect, editBook).delete(protect, deleteBook)


module.exports = booksRouter
