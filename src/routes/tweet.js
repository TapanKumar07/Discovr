const express = require("express")

const {upload} = require("../config/storage");
const {create , destroy, getMedia} = require("../controller/tweetController");


const passport = require("../config/passport-local-strategy");

const router = express.Router();

router.post('/create' , passport.checkAuthentication,upload.single('file'),create);
router.get('/image/:id', getMedia);
router.get('/destroy/:id' , passport.checkAuthentication , destroy);

//model level controller level validation

module.exports = router;
