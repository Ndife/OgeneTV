//This file contains the routes to the movies database
var express = require('express');
var router = express.Router();
var multer = require('multer');

var movieController = require('../controllers/movies');

//Specifying the storage path for the movie
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
//GET all the movies listing
router.get('/', movieController.getAllMovies);
//DELETE a movie by passing its Id
router.delete('/:id', movieController.deleteMovie);
//POST an update to a movie by passing its Id
router.post('/:id', movieController.updateMovie);
//GET a particular movie by any param eg name, producer
router.get('/search', movieController.getByParam);
//GET a movie by its Id
router.get('/:id', movieController.getById);

module.exports = router;