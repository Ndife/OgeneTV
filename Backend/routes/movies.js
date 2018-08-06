var express = require('express');
var router = express.Router();
var multer = require('multer');

var movieController = require('../controllers/movies');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})
var upload = multer({storage: storage});

router.post('/', upload.single('movieFile'), movieController.addMovie);
router.get('/', movieController.getAllMovies);
router.delete('/:id', movieController.deleteMovie);
router.post('/:id', movieController.updateMovie);
//router.get('/:options', movieController.getByParam);

module.exports = router;