const mongoose = require('mongoose')

const gendersSchema  = mongoose.Schema({
    id : Number,
    name : String,
})

const Gender = mongoose.model('genders', gendersSchema)

module.exports = Gender