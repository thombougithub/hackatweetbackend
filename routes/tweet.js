var express = require('express');
var router = express.Router();
require('../models/connection');
const Tweet = require('../models/tweet');
const { checkInput } = require('../modules/checkInput');

router.post('/add', (req,res)=>{
    if(!checkInput(req.body,['text'])){
      res.json({result:false,error:'Missing tweet'})
      return;
    }
    const date = new Date()
    const newTweet = new Tweet({
        text: req.body.text,
        date: date,
        user:req.body.id,
    });
    newTweet.save().then(newDoc=>{
        res.json({result:true,user:newDoc.user})
    })
  
});
router.get('/show', (req, res) => {
    Tweet.find()
    .populate('user')
    .then(data=>res.json({allTweets:data}))
  });
  
module.exports = router