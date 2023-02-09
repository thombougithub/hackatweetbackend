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
    const newTweet = new Tweet({
        text:req.body.text,
        user:req.body.user,
    });
    newTweet.save().then(newDoc=>{
        res.json({result:true,user:newDoc.user})
    })
  
});
router.get('/show', (req, res) => {
    Tweet.find().then(data=>res.json({allTweets:data}))
  });
  
module.exports = router