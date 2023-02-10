var express = require('express');
var router = express.Router();
require('../models/connection');
const User = require('../models/users');
const { checkInput } = require('../modules/checkInput');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');


router.post('/signup',(req,res)=>{
  if (!checkInput(req.body, ['username','firstname','password'])){
    res.json({result:false,error:'Missing or empty fields'})
    return;
  }
  User.findOne({username:req.body.username}).then(data=>{
    if(data===null){
      const hash = bcrypt.hashSync(req.body.password,10);
      const newUser = new User({
        username:req.body.username,
        password:hash,
        firstname:req.body.firstname,
        token:uid2(32),
      });
      newUser.save().then(newDoc=>{
        res.json({result:true, token:newDoc.token, firstname : newDoc.firstname, username: newDoc.username, id : newDoc.id})
      });

    }else{
      res.json({result:false,error:'User already exists'})
    };
  });
})
router.post('/signin',(req,res)=>{
  if(!checkInput(req.body,['username','password'])){
    res.json({result:false,error:'Missing or empty fields'})
    return;
  }
  User.findOne({username:req.body.username}).then(data=>{
    if (data && bcrypt.compareSync(req.body.password,data.password)){
      res.json({result:true, token:data.token, firstname : data.firstname, username: data.username, id : data.id})
    }else{
      res.json({result:false,error:'User not Found or wrong password'})
    }
  })
})
// ({$or:[{username:req.body.username},{firstname:req.body.firstname}]}) essayer de se log avec firstname+pass ou username+pass
module.exports = router;
