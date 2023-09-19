const mongoose = require('mongoose');

const connect = () => {
    console.log("MONGODB CONNECTED");
  const connectionString = process.env.MONGO_URI;
  
  return mongoose.connect(connectionString);
}

const promise = async() => {
     await connect();
}
module.exports = {connect};
