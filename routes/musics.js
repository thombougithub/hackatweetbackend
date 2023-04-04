var express = require('express');
var router = express.Router();
const Music = require('../models/music')
const User = require('../models/users')

// Get Search movies

router.post('/search', (req, res) => {
    const search = req.body.search
    fetch(`https://www.theaudiodb.com/api/v1/json/${process.env.MUSIC_API_KEY}/search.php?s=${search}`)
    .then(response => response.json())
    .then(data => {
        if (data.artists === null) {
            res.json({error : true, errorMessage: 'No artist found'})
        } else {
            fetch(`https://www.theaudiodb.com/api/v1/json/${process.env.MUSIC_API_KEY}/searchalbum.php?s=${search}`)
            .then(response => response.json())
            .then(doc => {
                res.json({error: false, global : data , album : doc})
        })
    }
    })
})

// Add musics to data base

router.post('/addMusics', (req,res) => {
 
    Music.findOne({idArtist : req.body.idArtist}).then(data => {
       if (!data) {
           const newMusic = new Music({
               idArtist : req.body.idArtist,
               title : req.body.title,
               picture : req.body.picture,
               style: req.body.style,
               genre: req.body.genre,
               biography: req.body.biography,
               })
               newMusic.save().then(doc => {
                       User.updateOne({token: req.body.token}, {$push : {musics : doc._id}}).then(() => 
                       res.json({result: true, message: 'music saved by user'}))})
               }
               
               else {
               Music.findOne({idArtist : req.body.idArtist}).then(db => {
                   User.findOne({token: req.body.token, musics : db._id}).then(data => {
                       if(data){
                           User.updateOne({token: req.body.token}, {$pull : {musics : db._id}}).then(() => 
                           res.json({result: true, message: 'music withdraw by user'}))
                       } else {
                           User.updateOne({token: req.body.token}, {$push : {musics : db._id}}).then(() => 
                           res.json({result: true, message: 'music saved by user'}))
                       } 
                          })
                       })       
               }                   
           })  
   })
   
   
   // Add musics to WatchList
   
   router.post('/addListen', (req,res) => {
 
    Music.findOne({idArtist : req.body.idArtist}).then(data => {
       if (!data) {
           const newMusic = new Music({
               idArtist : req.body.idArtist,
               title : req.body.title,
               picture : req.body.picture,
               style: req.body.style,
               genre: req.body.genre,
               biography: req.body.biography,
               })
               newMusic.save().then(doc => {
                       User.updateOne({token: req.body.token}, {$push : {listen : doc._id}}).then(() => 
                       res.json({result: true, message: 'music saved by user'}))})
               }
               
               else {
               Music.findOne({idArtist : req.body.idArtist}).then(db => {
                   User.findOne({token: req.body.token, listen : db._id}).then(data => {
                       if(data){
                           User.updateOne({token: req.body.token}, {$pull : {listen : db._id}}).then(() => 
                           res.json({result: true, message: 'music withdraw by user'}))
                       } else {
                           User.updateOne({token: req.body.token}, {$push : {listen : db._id}}).then(() => 
                           res.json({result: true, message: 'music saved by user'}))
                       } 
                          })
                       })       
               }                   
           })  
   })


     // get favorite musics of a person with token
   
     router.post('/musicsList', (req, res) => {
       User.findOne({token : req.body.token})
       .populate('musics')
       .then(data => {
           if(data){
               res.json({result : true, data : data})
   
           } else {
               res.json({result : false })
           }
       })
     })

     // get favorite musics of a person with username
   
     router.post('/follower', (req, res) => {
        User.findOne({username : req.body.username})
        .populate('musics')
        .then(data => {
            if(data){
                res.json({result : true, data : data})
    
            } else {
                res.json({result : false })
            }
        })
      })
   
     // get listening list of a person
   
     router.post('/listenList', (req, res) => {
       User.findOne({token : req.body.token})
       .populate('listen')
       .then(data => {
           if(data){
               res.json({result : true, data : data})
   
           } else {
               res.json({result : false })
           }
       })
     })





module.exports = router;
