const mongoose = require('mongoose');

const connect = () => {
    console.log("MONGODB CONNECTED");
return mongoose.connect('mongodb://localhost/twitter_dev');
}


module.exports = connect;