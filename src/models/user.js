const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    salt : {
        type : String,
        required : true
    },
    hash : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
}, {timestamps : true});

const User = mongoose.model('User', userSchema);

module.exports = User;