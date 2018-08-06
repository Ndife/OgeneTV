var model = require('../models/movies');

var mongoose = require('mongoose');
var multer = require('multer');

exports.addMovie = function(req, res, next){
    var movie = {
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price,
        releaseYear: req.body.releaseYear,
        description: req.body.description,
        movieFile: req.file.path
    }
    model.create(movie, function(err){
        if(err) res.json({err: err, message: 'Something went wrong'});
        res.json({message: 'Movie was added successfully'});
    })
}

exports.getAllMovies = function(req, res, next){
    model.find(function(err, movies){
        if(err) res,json({err: err, message:'Something went wrong'});
        res.json({
            count: movies.length,
            movies: movies
        })
    })
    .select('-__v')
}

exports.