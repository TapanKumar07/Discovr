const Tweet = require('../models/tweet');
const Comment = require('../models/comment');
const Media = require("../models/Media");

const mongoose = require("mongoose");
const conn = mongoose.connection;
var gfs;

conn.once('open',() => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});

const create = async function(req, res) {
    try{
        console.log(req.body)
        console.log(req.file)
        //u need to upload this file
        
        let tweet = await Tweet.create({
            content : req.body.content,
            user : req.user._id
        });

        if(req.file) {
            tweet.media = req.file.filename;
        }
        await tweet.save();

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

const getMedia = async function(req, res) {
    try {
        console.log(req.params.id);
        if(req.params.id == undefined) {
            req.flash('success', 'Cant Fetch Media')
            res.redirect('/'); 
        }
        const readStream = gfs.openDownloadStreamByName(req.params.id);
        readStream.pipe(res);
    } catch(err) {
        console.log(err);
        res.redirect('/');
    }
}


module.exports = {
    create,
    destroy,
    getMedia
}