const mongoose = require('mongoose');

const connect = () => {
    console.log("MONGODB CONNECTED");
    const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.8gby0.mongodb.net/?retryWrites=true&w=majority`
    return mongoose.connect(connectionString);
}


module.exports = connect;
