const express = require("express")

const {toggleLike} = require("../controller/likesController");

const passport = require("../config/passport-local-strategy");

const router = express.Router();

router.get('/toggle' , passport.checkAuthentication, toggleLike);
//model level controller level validation

module.exports = router;
