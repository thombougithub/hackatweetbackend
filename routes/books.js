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

// Add Books to data base

router.post('/addBooks', (req,res) => {
 
    Book.findOne({idBook : req.body.idBook}).then(data => {
       if (!data) {
           const newBook = new Book({
               idBook : req.body.idBook,
               title : req.body.title,
               subTitle: req.body.subTitle,
               picture : req.body.picture,
               author: req.body.author,
               date: req.body.date,
               description: req.body.description,
               token: req.body.token,
               link: req.body.link
               })
               newBook.save().then(doc => {
                       User.updateOne({token: req.body.token}, {$push : {books : doc._id}}).then(() => 
                       res.json({result: true, message: 'book saved by user'}))})
               }
               
               else {
               Book.findOne({idBook : req.body.idBook}).then(db => {
                   User.findOne({token: req.body.token, books : db._id}).then(data => {
                       if(data){
                           User.updateOne({token: req.body.token}, {$pull : {books : db._id}}).then(() => 
                           res.json({result: true, message: 'book withdraw by user'}))
                       } else {
                           User.updateOne({token: req.body.token}, {$push : {books : db._id}}).then(() => 
                           res.json({result: true, message: 'book saved by user'}))
                       } 
                          })
                       })       
               }                   
           })  
   })
   

   // Add musics to ReadList
   
router.post('/addRead', (req,res) => {
 
    Book.findOne({idBook : req.body.idBook}).then(data => {
       if (!data) {
           const newBook = new Book({
               idBook : req.body.idBook,
               title : req.body.title,
               subTitle: req.body.subTitle,
               picture : req.body.picture,
               author: req.body.author,
               date: req.body.date,
               description: req.body.description,
               token: req.body.token,
               link: req.body.link
               })
               newBook.save().then(doc => {
                       User.updateOne({token: req.body.token}, {$push : {read : doc._id}}).then(() => 
                       res.json({result: true, message: 'book saved by user'}))})
               }
               
               else {
               Book.findOne({idBook : req.body.idBook}).then(db => {
                   User.findOne({token: req.body.token, read: db._id}).then(data => {
                       if(data){
                           User.updateOne({token: req.body.token}, {$pull : {read : db._id}}).then(() => 
                           res.json({result: true, message: 'book withdraw by user'}))
                       } else {
                           User.updateOne({token: req.body.token}, {$push : {read : db._id}}).then(() => 
                           res.json({result: true, message: 'book saved by user'}))
                       } 
                          })
                       })       
               }                   
           })  
   })


     // get favorite Books of a person
   
     router.post('/booksList', (req, res) => {
       User.findOne({token : req.body.token})
       .populate('books')
       .then(data => {
           if(data){
               res.json({result : true, data : data})
   
           } else {
               res.json({result : false })
           }
       })
     })
   
     // get read list of a person
   
     router.post('/readList', (req, res) => {
       User.findOne({token : req.body.token})
       .populate('read')
       .then(data => {
           if(data){
               res.json({result : true, data : data})
   
           } else {
               res.json({result : false })
           }
       })
     })



module.exports = router;