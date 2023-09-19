const {GridFsStorage} = require('multer-gridfs-storage');
const multer = require("multer");
const mongoose = require("mongoose");
const crypto = require("crypto");
const path = require('path');
const {promise} =  require("../config/database");
const conn = mongoose.connection;
var gfs;


conn.once('open',() => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});

//create storage object

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage })

module.exports = {gfs, upload};