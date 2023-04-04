const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    username : String,
    email: String,
    password: String,
    description: String,
    picture : String,
    token: String,
    movies : [{type : mongoose.Schema.Types.ObjectId, ref : 'movies'}],
    watch : [{type : mongoose.Schema.Types.ObjectId, ref : 'movies'}],
    musics : [{type : mongoose.Schema.Types.ObjectId, ref : 'musics'}],
    listen : [{type : mongoose.Schema.Types.ObjectId, ref : 'musics'}],
    books : [{type : mongoose.Schema.Types.ObjectId, ref : 'books'}],
    read : [{type : mongoose.Schema.Types.ObjectId, ref : 'books'}],
    places : [{type : mongoose.Schema.Types.ObjectId, ref : 'places'}],
    point : [{type : mongoose.Schema.Types.ObjectId, ref : 'places'}],
    follow: [{type : mongoose.Schema.Types.ObjectId, ref : 'users'}],
})

const User = mongoose.model('users', usersSchema)

module.exports = User