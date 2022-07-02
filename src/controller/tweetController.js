const Tweet = require('../models/tweet');
const Comment = require('../models/comment');


const create = async function(req, res) {
    try{
        await Tweet.create({
            content : req.body.content,
            user : req.user._id
        });
         req.flash('success', 'Tweet Created Successfully')
         return res.redirect('back')
    } catch(err) {
        console.error(err);
        return res.redirect('back');
   }
   
}


const destroy =  async function(req,res) {
   try{
       const tweet = await Tweet.findById({_id : req.params.id});
       
        //Tweet can only be deleted by its creator
        if(req.user.id == tweet.user){
           req.flash('success', 'Deleted Successfully')
           await tweet.remove(); //async call
           await Comment.deleteMany({tweet: req.params.id})
        }
        res.redirect('/'); 
   } catch(err){
         console.error(err);
         return;
   }
   
}


module.exports = {
    create,
    destroy
}