const mongoose = require('mongoose')

const moviesSchema = mongoose.Schema({
    title : String,
    picture : String,
    type : [Number],
    Date : Number,
    SerieOrMovie : String,
    movieId : Number,
})

const Movie = mongoose.model('movies', moviesSchema)

module.exports = Movie