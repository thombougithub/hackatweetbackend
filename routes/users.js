var express = require('express');
var router = express.Router();
const User = require('../models/users')
const uid2 = require('uid2')
const bcrypt = require('bcrypt')

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

module.exports = router;
