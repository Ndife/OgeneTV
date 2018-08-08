var multer = require('multer');

//Specifying the storage path for the movie
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})
var filter = function(req, file, cb){
    if(file.mimetype === 'video/mp4' || file.mimetype === 'video/flv' ||
        file.mimetype === 'video/mov' || file.mimetype === 'video/avi'||
        file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else{
            cb({message: 'The file is not a movie/picture'}, false);
        }
}
var upload = multer({
    storage: storage,
    fileFilter: filter});

module.exports = upload;