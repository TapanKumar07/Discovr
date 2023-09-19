const comment = require('../models/comment');
const Tweet = require('../models/tweet');
const { newCommentMailer } = require('../mailers/comment_mailer');


const create = async function(req, res) {
    
    try{
        console.log("whtttt" , req.body);
        const tweet = await Tweet.findById(req.body.tweet).populate('user');
        const commet = await comment.create({
            content : req.body.content,
            tweet :   req.body.tweet,
            user :    req.user
         });
          //  newCommentMailer(tweet);
            req.flash('success', 'Comment Created Successfully')
            res.redirect('back');   
    } catch(err){
       console.error("Error Creating Tweet",err);
       return res.redirect('back');
    }
    
}


const destroy = async function(req, res) {
  try{
    const commet = await comment.findById({_id : req.params.id});
    console.log(req.params.id, commet);
    if(commet.user == req.user.id){
        req.flash('success', 'Comment Deleted Successfully')
        await comment.findByIdAndDelete(req.params.id);
    }
    return res.redirect('/');
  } catch(err){
    console.error("Error deleting comment", err)
    return res.redirect('back');
  }
    
   
}

module.exports = {create, destroy};
 