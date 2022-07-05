const comment = require('../models/comment');
const Tweet = require('../models/tweet');
const { newCommentMailer } = require('../mailers/comment_mailer');


const create = async function(req, res) {
    
    try{
        const tweet = await Tweet.findById(req.body.tweet).populate('user');
        const commet = await comment.create({
            content : req.body.content,
            tweet :   req.body.tweet,
            user :    req.user
         });
            newCommentMailer(tweet);
            req.flash('success', 'Comment Created Successfully')
            tweet.comments.push(commet);
            tweet.save();
           
            res.redirect('back');   
    } catch(err){
       console.error("Error Creating Tweet",err);
       return res.redirect('back');
    }
    
}


const destroy = async function(req, res) {
  try{
    const commet = await comment.findById({_id : req.params.id});
    if(commet.user == req.user.id){
        let tweetId = commet.tweet;
        comment.remove();
        await Tweet.findByIdAndUpdate(tweetId, { $pull : {comments : req.params.id}});
    }
    return res.redirect('/');
  } catch(err){
    console.error("Error deleting comment", err)
    return;
  }
    
   
}

module.exports = {create, destroy};
 