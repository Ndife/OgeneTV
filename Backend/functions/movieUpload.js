var multer = require('multer');

//Specifying the storage path for the movie
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.mimetype === 'video/mp4' || file.mimetype === 'video/flv' ||
        file.mimetype === 'video/mov' || file.mimetype === 'video/avi'){
            cb(null, './files/videos/');
        }else if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, './files/images/');
        }else{
            cb({message: 'The file is neither a video or image file'}, false);
        }
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

var upload = multer({storage: storage});

module.exports = upload;