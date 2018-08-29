var Comment = require('../models/comment');
var Movie = require('../models/movies');
var ObjectID = require('mongoose').Types.ObjectId;

exports.addComment = function(req, res){
    var comment = {
        commentBody: req.body.commentBody,
        user: req.body.user
    }
    try {
        Comment.create(comment, (err, comment) => {
            if(err){
                res.status(500).json({Err: err, message: 'Error occured while creating comment'});
            } else {
                var movieId = new ObjectID(req.body.movie);
                Movie.findById({_id: movieId}, function(err, movie){
                    if(err){
                        res.status(500).json({Err: err, message: 'Error while finding movie'});
                    } else {
                        movie.comments.push(comment._id);
                        Movie.create(movie);
                        res.status(201).json({message: 'Comment created successfully'})
                    }
                })
            }
        })
    } catch (exception) {
        console.log('Error: ' + exception);
    }
}

exports.getComments = function(req, res){
    try {
        Comment.find(function(err, comments){
            if(err){
                res.status(500).json({Err: err, message: 'Error occured'});
            }else if(comments == 0){
                res.status(200).json({message: 'Comment list is empty'});
            }else{
                res.status(200).json(comments)
            }
        })
        .populate({path: 'user', select: 'name -_id'})
        .select('-__v')
    } catch (exception) {
        console.log('Error: ' + exception);
    }
}

exports.deleteComment = function(req, res){
    try {
        var id = {_id: req.params.id};
        Comment.remove(id, (err) => {
            if(err){
                res.status(500).json({Err: err, message: 'Error occured'});
            }else{
                res.status(200).json({message: 'Comment deleted successfully'})
            }
        })
    } catch (exception) {
        console.log('Error: ' + exception);
    }
}