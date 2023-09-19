const mongoose = require('mongoose');


const MediaSchema = new mongoose.Schema({
    
    tweet : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Tweet',
        required : true
    },
    filename :{
        type : String,
        required : true
    }
    
}, {timestamps : true});

const Like = mongoose.model('Media', MediaSchema);

module.exports = Like;