var express = require('express');
var router = express.Router();
const User = require('../models/users')
const uid2 = require('uid2')
const bcrypt = require('bcrypt')
const uniqid = require('uniqid')
const cloudinary = require('cloudinary')
const fs = require('fs')

/* Signup */
router.post('/signup', (req,res) => {
    if(!req.body.password || !req.body.username){
    res.json({result: false, error: 'Missing or empty fields'})
    return
    }
    
    User.findOne({username : req.body.username})
    .then(data => {
        if(data){
            res.json({result: false, error: 'User already exists'})
        } else {
            const hash = bcrypt.hashSync(req.body.password, 10)
            const newUser = new User ({
                username : req.body.username,
                password : hash,
                token: uid2(32)
            })
            newUser.save().then(newDoc => {res.json({result: true, data: newDoc})})
        }
    })

})

/* Sign in */

router.post('/signin', (req,res) => {
    if(!req.body.username || !req.body.password){
        res.json({result : false, error : 'Missing or empty fields'})
        return
    }

    User.findOne({username : req.body.username})
    .then(data => {
        if(data && bcrypt.compareSync(req.body.password, data.password)){
            console.log('sent')
            res.json({result : true, data : data})
        } else {
            res.json({result : false, error : "user doesn't exist or wrong password" })
        }
    })
})

// get info of user 

router.post('/getInfo', (req,res) => {
    User.findOne({token : req.body.token})
       .then(data => {
           if(!data){
               res.json({result: false, error: 'User no found'})
           } else {
               res.json({result: true, db : data})
           }
       })
   
   })

   // get info of user with username

   router.post('/getInfoFollower', (req,res) => {
    User.findOne({username : req.body.username})
       .then(data => {
           if(!data){
               res.json({result: false, error: 'User no found'})
           } else {
               res.json({result: true, db : data})
           }
       })
   
   })


// adapt picture of user

router.post('/picture', async (req,res) => {
    const photoPath = `./tmp/${uniqid()}.jpg`
    const resultMove = await req.files.photoFromFront.mv(photoPath);

    if(!resultMove){ 
        const resultCloudinary =  await cloudinary.uploader.upload(photoPath);
        
        res.json({result : true, url : resultCloudinary.secure_url})
    } else {
        res.json({result : false, error : resultMove})
    }

    fs.unlinkSync(photoPath);
})

// adapt info of users
router.post('/adaptInfo', (req,res) => {
 User.updateOne({token : req.body.token}, {description : req.body.description})
    .then(data => {
        if(!data){
            res.json({result: false, error: 'User no found'})
        } else {
            User.findOne({token: req.body.token}).then(data => {
                res.json({result : true, db : data})
            })
        }
    })

})

module.exports = router;
