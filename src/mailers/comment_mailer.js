
require('dotenv').config();

const {createTransporter} = require('../config/mailer');

const sendEmail = async (tweet, emailOptions) => {
    let emailTransporter = await createTransporter();
    emailTransporter.sendMail(emailOptions, function(err, res){
      if(err){
        console.error(err);
        return;
       }
       console.log("EMAIL SENT SUCCESSFULLY"); 
    });
  };

const newCommentMailer = function(tweet)
{
    sendEmail(tweet,{
        subject: "Discover Alerts",
        to: tweet.user.email,
        from: process.env.EMAIL,
        html : '<h3>This is a System Generated Mail<h3> <p> New Comment on Your Post !!! </p>'
      });
}

module.exports = {newCommentMailer};