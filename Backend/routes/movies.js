//This file contains the routes to the movies database
var express = require('express');
var router = express.Router();
var multer = require('multer');

var movieController = require('../controllers/movies');

var upload = require('../movieUpload')


router.post('/', upload.any(), movieController.addMovie);
//GET all the movies listing
router.get('/', movieController.getAllMovies);
//DELETE a movie by passing its Id
router.get('/delete/:id', movieController.deleteMovie);
//POST an update to a movie by passing its Id
router.post('/:id', movieController.updateMovie);
//GET a particular movie by any param eg name, producer
router.get('/get', movieController.getByParam);

router.get('/search/:value', movieController.searchMovie);
//GET a movie by its Id
router.get('/:id', movieController.getById);

module.exports = router;