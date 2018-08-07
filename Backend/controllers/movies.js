var model = require('../models/movies');

var mongoose = require('mongoose');
var multer = require('multer');

exports.addMovie = function(req, res, next){
    model.find({name: req.body.name}, function(err, movie){
        if (movie){
            res.status(409).json({message: 'Movie has been uploaded before'})
        }
        else {
            var movie = {
                _id: new mongoose.Types.ObjectId,
                name: req.body.name,
                price: req.body.price,
                releaseYear: req.body.releaseYear,
                description: req.body.description,
                movieFile: req.file.path
            }
            model.create(movie, function(err){
                if(err){
                    res.json({err: err, message: 'Something went wrong'});
                }else{
                    res.json({message: 'Movie was added successfully'});
                }
             });
        }
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

exports.getByParam = function(req, res, next){
    var options = req.query;
    model.find(options,'-__v', function(err, movies){
        if(err) res.json({message: 'Resource not found'});
        res.json({message: movies});
    })
}

exports.updateMovie = function(req, res){
    var id = req.params.id;
    var update = req.body;
    model.findByIdAndUpdate(id, update, function(err){
        if(err) res.json({err: err, message: 'Update error'});
        res.json({message: update});
    })
}

exports.deleteMovie = function(req, res, next){
    var id = {_id: req.params.id};
    model.remove(id, function(err){
        if(err) res.json({err: err, message: 'The resource could not be deleted'})
        res.json({message: 'The movie was deleted'});
    })
}