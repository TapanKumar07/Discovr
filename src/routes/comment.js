const express = require("express")

const {create, destroy} = require("../controller/commentController");

const passport = require("../config/passport-local-strategy");

const router = express.Router();

router.post('/create' , passport.checkAuthentication, create);
router.get('/destroy/:id'  , passport.checkAuthentication, destroy);
//model level controller level validation

module.exports = router;
