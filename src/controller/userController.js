const User = require('../models/user');


const profile = function(req,res) {
    User.findById(req.params.id, function(err, user){
        if(!user){
          return res.redirect('/');
        }
        return res.render('users/user_profile', {
            title : 'User Profile',
            profileUser : user
        });
    })
   
}


const signUp = function(req,res) {
   if(req.isAuthenticated()) {
       return res.redirect('/');
   }


   return res.render('users/user_sign_up', {
       title : "Twitter sign up"
   })
}
const signIn = function(req,res) {
    //create User
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }


    return res.render('users/user_sign_in', {
        title : "Twitter sign in"
    })
}
const create =  function(req,res) {
    if(req.body.password != req.body.confirm_password)
       return res.redirect('back');
    
    User.findOne({email : req.body.email}, function(err, user){
        if(err) {
         console.error(err);
         return res.end();
        }

        if(!user) {
            User.create(req.body , function(err, user) {
                if(err) {
                    console.error(err);
                    return res.end();
                   }
                   return res.redirect('/users/signin');
            })
        } else {
            return res.redirect('/users/signin');
        }
    })
}

const update = function(req, res){
    if(req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
            if(err)
            {
                console.log('Error updating User');
                return res.redirect('/');
            }
            req.flash('info', 'Information Updated!')
            return res.redirect('back');
        })
    }
    else{
        return res.status(401).isAuthenticated('Unauthorised');
    }
}


const createSession = function(req, res){
    req.flash('info', 'Signed In Successfully')

    return res.redirect('/');
}

const destroySession = function(req,res,next) {
    
    req.logout(function(err) {
    if (err) {
         return next(err); 
    }
    req.flash('info', 'Signed Out Successfully')
    return res.redirect('/');
})
};

module.exports = {
    profile,
    signIn,
    signUp,
    create,
    createSession,
    destroySession,
    update
}