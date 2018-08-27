//This file contains the routes to the movies database
var express = require('express');
var router = express.Router();
var movieController = require('../controllers/movies');
var upload = require('../functions/movieUpload')


router.post('/add', upload.any(), movieController.addMovie);
//GET all the movies listing
router.get('/', movieController.getAllMovies);
//DELETE a movie by passing its Id
router.get('/delete/:id', movieController.deleteMovie);
//POST an update to a movie by passing its Id
router.post('/find/:id', movieController.updateMovie);
//GET a particular movie by any param eg name, producer
router.get('/get', movieController.getByParam);

router.post('/search', movieController.searchMovie);
//GET a movie by its Id
router.get('/find/:id', movieController.getById);

router.get('/recent', movieController.sortRecent);

module.exports = router;