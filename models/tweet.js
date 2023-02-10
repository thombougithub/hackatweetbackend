const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    date:Date,
    text:String,
    user:{type:mongoose.Schema.Types.ObjectId, ref:'users'}
})
const Tweet = mongoose.model('tweets',tweetSchema);
module.exports = Tweet