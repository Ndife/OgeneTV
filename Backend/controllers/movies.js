//This file contains the operations on the model
var Movie = require('../models/movies');
var deleteFilePath = require('../deleteFile');

var mongoose = require('mongoose');
var multer = require('multer');

exports.addMovie = function(req, res, next){
    Movie.find({name: req.body.name}, function(err, movie){
        //console.log(movie.name);
        if (movie.length){
            res.status(409).json({message: 'Movie has been uploaded before'})
        } else {
            var movie = {
                time: Date.now(),
                name: req.body.name,
                description: req.body.description,
                releaseYear: req.body.releaseYear,
                producer: req.body.producer,
                category: req.body.category,
                price: req.body.price,
                image: req.files[0].path,
                video: req.files[1].path
            }
            Movie.create(movie, function(err){
                if(err){
                    res.json({err: err, message: 'Something went wrong'});
                }else{
                    console.log(movie);
                    res.json({message: 'Movie was added successfully'});
                }
             });
        }
    })
}

exports.getAllMovies = function(req, res, next){
    Movie.find(function(err, movies){
        if(err) res.json({err: err, message:'Something went wrong'});
        res.json({
            count: movies.length,
            movies: movies
        })
    })
    .select('-__v')
}

exports.getById = function(req, res, next){
    var id = ({_id:req.params.id});
     Movie.findById(id, '-__v', function(err, movie){
        if(err) {
            res.json({message: 'Resource not found'});
        } else if(movie){
            res.json({message: movie});
        } else {
            res.json({message: 'No valid entry for required Id'});
        }
    })
}

exports.getByParam = function(req, res, next){
    var options = req.query;
    Movie.find(options, '-__v', function(err, movies){
        if(err) {
            res.json({message: 'Resource not found'});
        } else if(movies.length){
            res.json({message: movies});
        } else {
            res.json({message: 'No valid entry for required param'});
        }
    })
}

exports.updateMovie = function(req, res){
    var id = req.params.id;
    var update = req.body;
    Movie.findByIdAndUpdate(id, update, function(err){
        if(err) res.json({err: err, message: 'Update error'});
        res.json({message: update});
    })
}

exports.deleteMovie = function(req, res, next){
    var id = ({_id:req.params.id});
    console.log(id);
    Movie.findById(id, function(err, movie){
        console.log(movie);
        deleteFilePath(req, res, movie);
        Movie.remove(id, function(err){
            if(err) {
                res.json({err: err, message: 'The resource could not be deleted'})
            }else{
                res.json({message: 'The movie was deleted'});
            }
        })
    })
}