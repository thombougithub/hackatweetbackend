var express = require('express');
var router = express.Router();
const Book = require('../models/books')
const User = require('../models/users')


// Get Search books

router.post('/search', (req, res) => {
    const search = req.body.search
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40&key=${process.env.GOOGLE_API_KEY}`)
    .then(response => response.json())
    .then(data => {res.json({result : data})})
})

// add Book to dataBase
/*
router.post('/addMovies', (req,res) => {
 
    Movie.findOne({movieId : req.body.movieId}).then(data => {
       if (!data) {
           const newMovie = new Movie({
               title : req.body.title,
               picture : req.body.picture,
               type : req.body.type,
               Date : req.body.date,
               SerieOrMovie : req.body.sm,
               movieId : req.body.movieId
               })
           
               newMovie.save().then(doc => {
                       User.updateOne({token: req.body.token}, {$push : {movies : doc.id}}).then(() => 
                       res.json({result: true, message: 'movie saved by user'}))})
               }
               
               else {
               Movie.findOne({movieId : req.body.movieId}).then(db => {
                   User.findOne({token: req.body.token, movies : db._id}).then(data => {
                       if(data){
                           console.log(data)
                           User.updateOne({token: req.body.token}, {$pull : {movies : db._id}}).then(() => 
                           res.json({result: true, message: 'movie withdraw by user'}))
                       } else {
                           User.updateOne({token: req.body.token}, {$push : {movies : db._id}}).then(() => 
                           res.json({result: true, message: 'movie saved by user'}))
                       } 
                          })
                       })       
               }                   
           })  
   })*/




module.exports = router;