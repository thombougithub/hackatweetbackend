const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    timer:Date,
    text:String,
    nbrLike:Number,
    user:{type:mongoose.Schema.Types.ObjectId, ref:'users'}
})
const Tweet = mongoose.model('tweets',tweetSchema);
module.exports = Tweet