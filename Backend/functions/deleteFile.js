var fs = require('fs');
var multer = require('multer');
var Movie = require('../models/movies');

var deleteFilePath = function(req, res, movie){
        fs.unlink(movie.image, (err) => {
            if(err){
                res.json({message: 'Resource could not be deleted'})
            }else{
            console.log('successfully deleted '+ movie.image);
            }
        })
        fs.unlink(movie.video, (err) => {
            if(err){
                res.json({message: 'Resource could not be deleted'})
            }else{
            console.log('successfully deleted '+ movie.video);
            }
        })
}

module.exports = deleteFilePath;