const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    username : String,
    password: String,
    picture : String,
    token: String,
    movies : [{type : mongoose.Schema.Types.ObjectId, ref : 'movies'}]
})

const User = mongoose.model('users', usersSchema)

module.exports = User