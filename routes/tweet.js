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
    newTweet.save()
    .then(newDoc=>{ 
      Tweet.findById(newDoc.id).populate('user').then(tweet => {
        res.json({result:true,user:tweet.user, tweet})
      })
    })
  
});
router.get('/show', (req, res) => {
    Tweet.find()
    .populate('user')
    .then(data=>res.json({allTweets:data}))
  });

router.delete('/delete/:_id', (req, res)  => {
      Tweet.deleteOne({id: req.params._id}).then( () => res.json({
    result : 'cancelled'}) )
})

  
module.exports = router