const mongoose = require('mongoose')

const booksSchema = mongoose.Schema({
    title : String,
    picture : String,
    author: String,
    Date : Number,
})

const Book = mongoose.model('books', booksSchema)

module.exports = Book