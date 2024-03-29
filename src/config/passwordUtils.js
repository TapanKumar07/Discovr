const crypto = require("crypto");

const genPassword = (password) => {
   var salt = crypto.randomBytes(32).toString('hex');
   var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

   return {
    salt : salt,
    hash : genHash
   }
}

const validatePassword = (password, hash, salt) => {
     var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
     return hashVerify === hash;
 }


module.exports = {genPassword, validatePassword};


