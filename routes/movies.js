var express = require('express');
var router = express.Router();
const Movie = require('../models/movies')
const User = require('../models/users')



// Get discover movies
router.get('/discover', (req,res) => {
    fetch(`https://api.themoviedb.org/3/discover/movie/?api_key=${process.env.OWN_API_KEY}`)
      .then(response => response.json())
      .then(data => res.json({result : data}))
})


// Get Search movies

router.post('/search', (req, res) => {
    const language = 'fr'
    const search = req.body.search
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.OWN_API_KEY}&language=${language}&query=${search}&page=1&include_adult=false`)
    .then(response => response.json())
    .then(data => {res.json({result : data})})
})

// Add movies to data base

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
})


// Add movies to WatchList

router.post('/addWatch', (req,res) => {
 
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
                       User.updateOne({token: req.body.token}, {$push : {watch : doc.id}}).then(() => 
                       res.json({result: true, message: 'movie saved by user'}))})
               }
               
               else {
               Movie.findOne({movieId : req.body.movieId}).then(db => {
                   User.findOne({token: req.body.token, watch : db._id}).then(data => {
                       if(data){
                           console.log(data)
                           User.updateOne({token: req.body.token}, {$pull : {watch : db._id}}).then(() => 
                           res.json({result: true, message: 'movie withdraw by user'}))
                       } else {
                           User.updateOne({token: req.body.token}, {$push : {watch : db._id}}).then(() => 
                           res.json({result: true, message: 'movie saved by user'}))
                       } 
                          })
                       })       
               }                   
           })  
   })

  // get favorite movies of a person

  router.post('/moviesList', (req, res) => {
    User.findOne({token : req.body.token})
    .populate('movies')
    .then(data => {
        if(data){
            res.json({result : true, data : data})

        } else {
            res.json({result : false })
        }
    })
  })

  // get watch list of a person

  router.post('/watchList', (req, res) => {
    User.findOne({token : req.body.token})
    .populate('watch')
    .then(data => {
        if(data){
            res.json({result : true, data : data})

        } else {
            res.json({result : false })
        }
    })
  })


module.exports = router;
