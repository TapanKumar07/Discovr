const Tweet = require("../models/tweet");
const User = require("../models/user");
const comment = require("../models/comment");

module.exports.root = async function(req,res) {

     try {
          const tweets = await Tweet.find({})
          .populate('user')
          .sort({"createdAt" : -1}).exec();
             
               let fetchedTweets = tweets;
               let arrayOfData = [];
               for(var tweet of tweets) {
                   let responseObject = {
                      tweet : await tweet,
                      comments : await comment.find({tweet : tweet._id}).populate('user').exec()
                   }
                 
                   arrayOfData.push(responseObject);
               }
               const users = await User.find({});
               
               return res.render('home',
               {
                    name : "Welcome to Discovrr", 
                    title: "Discovrr", 
                    tweets : arrayOfData,
                    users : users
               });
               
     } catch(err) {
          console.error(err);
          return;
     }
    
     

    
}