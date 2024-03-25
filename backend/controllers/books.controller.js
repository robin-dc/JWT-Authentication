const asyncHandler = require('express-async-handler')
const Book = require('../models/booksModel')
const User = require('../models/userModel')

// @desc Retrieve all books
// @route GET /api/books/
// @access public
const getAllBooks = asyncHandler(async(req, res) => {
    const allBooks = await Book.find({user: req.user.id})

    if(!allBooks){
        res.status(404)
        throw new Error('No books found')
    }

    res.status(200).json(allBooks)
})

// @desc Create a single book
// @route POST /api/books/
// @access private
const createBook = asyncHandler(async(req, res) => {
    const { title, desc } = req.body

    if(!title){
        res.status(400)
        throw new Error('Book title is required')
    }

    const book = await Book.create({
        title,
        desc,
        user:req.user.id
    })
    res.status(201).json(book)
})

// @desc Edit a single book
// @route PATCH /api/books/:id
// @access private
const editBook = asyncHandler(async(req, res) => {
    const { id } = req.params
    const { title, desc } = req.body
    const bookToEdit = await Book.find({_id: id})

    if(!bookToEdit){
        res.status(404)
        throw new Error('No book found')
    }


    const user = await User.findById(req.user.id)
    // i guess req.user.id qill be null if theres no req.user created in the token


    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    console.log(user)
    // Make sure the logged in user matches the goal user
    if(bookToEdit.user.ToString() !== user._id){
        res.status(401)
        throw new Error('User not authorized')
    }


    const updatedBook = await Book.findByIdAndUpdate({_id: id}, {title, desc}, {new: true})

    res.status(200).json(updatedBook)
})

// @desc Delete a single book
// @route DELETE /api/books/:id
// @access private
const deleteBook = asyncHandler(async(req, res) => {
    const { id } = req.params
    const bookToDelete = await Book.find({_id: id})

    if(!bookToDelete){
        res.status(404)
        throw new Error('No book found')
    }

    const user = await User.findById(req.user.id)
    // i guess req.user.id qill be null if theres no req.user created in the token


    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    console.log(user)
    // Make sure the logged in user matches the goal user
    if(bookToDelete.user.ToString() !== user._id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await Book.findByIdAndDelete({_id: id})

    res.status(200).json({message: "Deleted Successfully"})
})

module.exports = {
    getAllBooks,
    createBook,
    editBook,
    deleteBook
}
