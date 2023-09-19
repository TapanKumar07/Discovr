const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true,
        maxlength : 300,
        minlength : 5
    },
    media : {
        type : String,
        default : null
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
}, {timestamps : true});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;