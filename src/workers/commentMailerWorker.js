const queue = require('../config/kue');
const { newCommentMailer } =    require('../mailers/comment_mailer');

queue.process('email', function(job, next) {
 console.log('Email Worker Started !!!', job.data);
 newCommentMailer(job.data);
 next();
})