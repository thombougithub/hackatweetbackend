var express = require('express');
var router = express.Router();
const User = require('../models/users')
const Place = require('../models/places')

// Get Search books

router.post('/search', (req, res) => {
    const search = req.body.search
    fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry%2Cphotos%2Cplace_id&input=${search}&inputtype=textquery&key=${process.env.PLACE_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      res.json({result: data})
})
})


// add Place to dataBase

router.post('/addPlaces', (req,res) => {
 
    Place.findOne({placeId : req.body.placeId}).then(data => {
       if (!data) {
           const newPlace = new Place({
            name : req.body.name, 
            address :  req.body.address,
            picture : req.body.picture,
            placeId : req.body.placeId,
            rating :  req.body.rating,
            latitude : req.body.latitude,
            longitude : req.body.longitude
               })
           
               newPlace.save().then(doc => {
                       User.updateOne({token: req.body.token}, {$push : {places : doc._id}}).then(() => 
                       res.json({result: true, message: 'place saved by user'}))})
               }
               
               else {
               Place.findOne({placeId : req.body.placeId}).then(db => {
                   User.findOne({token: req.body.token, places : db._id}).then(data => {
                       if(data){
                           User.updateOne({token: req.body.token}, {$pull : {places : db._id}}).then(() => 
                           res.json({result: true, message: 'place withdraw by user'}))
                       } else {
                           User.updateOne({token: req.body.token}, {$push : {places : db._id}}).then(() => 
                           res.json({result: true, message: 'place saved by user'}))
                       } 
                          })
                       })       
               }                   
           })  
   })


// add Place to visit

router.post('/addPoint', (req,res) => {
 
    Place.findOne({placeId : req.body.placeId}).then(data => {
       if (!data) {
           const newPlace = new Place({
            name : req.body.name, 
            address :  req.body.address,
            picture : req.body.picture,
            placeId : req.body.placeId,
            rating :  req.body.rating,
            latitude : req.body.latitude,
            longitude : req.body.longitude
               })
           
               newPlace.save().then(doc => {
                       User.updateOne({token: req.body.token}, {$push : {point : doc._id}}).then(() => 
                       res.json({result: true, message: 'place saved by user'}))})
               }
               
               else {
               Place.findOne({placeId : req.body.placeId}).then(db => {
                   User.findOne({token: req.body.token, point : db._id}).then(data => {
                       if(data){
                           User.updateOne({token: req.body.token}, {$pull : {point : db._id}}).then(() => 
                           res.json({result: true, message: 'place withdraw by user'}))
                       } else {
                           User.updateOne({token: req.body.token}, {$push : {point: db._id}}).then(() => 
                           res.json({result: true, message: 'place saved by user'}))
                       } 
                          })
                       })       
               }                   
           })  
   })

   // get favorite places of a person with token

  router.post('/placesList', (req, res) => {
    User.findOne({token : req.body.token})
    .populate('places')
    .then(data => {
        if(data){
            res.json({result : true, data : data})

        } else {
            res.json({result : false })
        }
    })
  })

  // get favorite movies of a person with username

  router.post('/follower', (req, res) => {
    User.findOne({username : req.body.username})
    .populate('places')
    .then(data => {
        if(data){
            res.json({result : true, data : data})

        } else {
            res.json({result : false })
        }
    })
  })


  // get watch list of a person

  router.post('/pointsList', (req, res) => {
    User.findOne({token : req.body.token})
    .populate('point')
    .then(data => {
        if(data){
            res.json({result : true, data : data})

        } else {
            res.json({result : false })
        }
    })
  })


module.exports = router;

