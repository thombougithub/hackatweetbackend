const mongoose = require('mongoose')


const  albumsSchema = mongoose.Schema({
    title: String,
    picture: String,
    date: Number,
   });

const musicsSchema = mongoose.Schema({
    idArtist : Number,
    title : String,
    picture : String,
    style : String,
    genre: String,
    biography: String,
    albums: [albumsSchema]


})

const Music = mongoose.model('musics', musicsSchema)

module.exports = Music