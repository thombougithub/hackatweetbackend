const mongoose = require('mongoose')

const booksSchema = mongoose.Schema({
    idBook: String,
    title : String,
    subTitle : String,
    picture : String,
    author: [String],
    date : String,
    description: String,
    link: String,
})

const Book = mongoose.model('books', booksSchema)

module.exports = Book