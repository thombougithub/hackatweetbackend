const mongoose = require('mongoose')

const musicsSchema = mongoose.Schema({
    title : String,
    picture : String,
    type : [Number],
    Date : Number,
    SerieOrMovie : String,
    movieId : Number,
})

const Music = mongoose.model('musics', musicsSchema)

module.exports = Music