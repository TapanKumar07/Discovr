const express=  require("express");
const userController = require("../controller/userController");
const router = express.Router();
const passport = require('../config/passport-local-strategy')

router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.get('/signin',userController.signIn);
router.get('/signup',userController.signUp);
router.post('/create',userController.create);

router.post('/createSession',passport.authenticate(
    'local',
    {
              failureRedirect : '/users/signin'
    }),userController.createSession);


router.get('/signout' , userController.destroySession);

router.post('/update/:id' ,passport.checkAuthentication, userController.update);

module.exports = router;