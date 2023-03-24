const mongoose = require('mongoose')

const placesSchema = mongoose.Schema({
      name : String, 
      address :  String,
      picture : String,
      placeId : String,
      rating :  Number,
      latitude : Number,
      longitude : Number
})

const Place = mongoose.model('places', placesSchema)

module.exports = Place