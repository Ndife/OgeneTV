//This file contains the operations on the model
var Movie = require('../models/movies');
var cloud = require('../functions/cloudinaryUpload');

exports.addMovie = function(req, res, next){
    try {
    Movie.find({title: req.body.title.toLowerCase()}, function(err, movie){
        if (movie.length){
            res.status(409).json({message: 'Movie has been uploaded before'})
        } else if (req.files.length != 2){
            return res.json({mesage: 'Please upload both image and video files'})
        }
         else {
            var movie = {
                time: Date.now(),
                title: req.body.title.toLowerCase(),
                description: req.body.description,
                releaseYear: req.body.releaseYear,
                producer: req.body.producer,
                category: req.body.category,
                price: req.body.price,
                image: req.files[0].path,
                imageID: '',
                video: req.files[1].path,
                videoID: ''
            }
            cloud.upload(movie.image).then((result) => {
                movie.image = result.url;
                movie.imageID = result.Id;
                cloud.upload(movie.video).then((result) => {
                    movie.video = result.url;
                    movie.videoID = result.Id;
                    Movie.create(movie, function(err){
                        if(err){
                                res.status(500).json({err: err, message: 'Something went wrong'});
                        }else{
                            console.log(movie);
                            res.status(201).json({message: 'Movie was added successfully'});
                        }
                     });
                }).catch((error)=>{
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error);
            })
           
        }
    })
    } catch (exception) {
        console.log('Error: ' + exception);
    }
}

exports.getAllMovies = function(req, res, next){
    try {
    Movie.find(function(err, movies){
            if(err) {
                res.status(500).json({err: err, message:'Something went wrong'})
            }else if(movies.length == 0){
                res.status(200).json({message: 'List of movies is empty'})
            }else{
                res.status(200).json({
                    count: movies.length,
                    movies: movies
                })
            }    
    })
    .select('-__v')
    } catch (exception) {
        console.log('Error: ' + exception);
}
}

exports.getById = function(req, res, next){
    try {
    var id = ({_id:req.params.id});
     Movie.findById(id, '-__v', function(err, movie){
        if(err) {
               res.status(404).json({message: 'Resource not found'});
        } else if(movie){
               res.status(200).json({message: movie});
        } else {
               res.status(401).json({message: 'No valid entry for required Id'});
        }
    });
    } catch (exception) {
        console.log('Error: ' + exception);
    }
}

exports.getByParam = function(req, res, next){
    try {
    var options = req.query;
    Movie.find(options, '-__v', function(err, movies){
        if(err) {
                res.status(404).json({message: 'Resource not found'});
        } else if(movies.length){
                res.status(200).json({message: movies});
        } else {
                res.status(401).json({message: 'No valid entry for required param'});
        }
    })
    } catch (exception) {
        console.log('Error: ' + exception);
    }

}

exports.updateMovie = function(req, res){
    try {
    var id = req.params.id;
    var update = req.body;
    Movie.findByIdAndUpdate(id, update, function(err){
            if(err){
                res.status(500).json({err: err, message: 'Update error'});
            } else {
            res.status(201).json({message: update});
            }
    })
    } catch (exception) {
        console.log('Error: ' + exception);
    }

}

exports.searchMovie = function(req, res){
    try {
        var value = req.params.value;
        Movie.find({"title":{$regex: value, $options: 'i'}}, '-__v', function(err, movie){
            if (err) {
                res.json({err:err, message:'sorry, could not find movie'})
            } else if(movie.length == 0){
                res.status(401).json({message: 'No result for search'});
            } else {
                res.status(200).json(movie);
            }
        });
    } catch (exception) {
        console.log('Error: ' + exception);
    }
}

exports.deleteMovie = function(req, res, next){
    try {
    var id = ({_id:req.params.id});
    Movie.findById(id, function(err, movie){
            if (movie !== null){
                if (err){
                    res.status(404).json({message: 'The required movie does not exist'});
                }else{
                    cloud.deleteVideoFile(movie.videoID).then(() => {
                        cloud.delete(movie.imageID).then(() => {
                            Movie.remove(id, function(err){
                                if(err) {
                                    res.status(500).json({err: err, message: 'The resource could not be deleted'})
                                }else{
                                    res.status(200).json({message: 'The movie was deleted'});
                                }
                            })
                        })
                    })
                }
            }else{
                res.status(404).json({message: 'The movie with required Id not found'});
            }
        }) 
    }catch (exception) {
        console.log('Error: ' + exception);
    } 
}

exports.sortRecent = function(req, res, next){
    try {
        var value = Number.parseInt(req.query.value);
        Movie.find({}, '-__v', {limit: value, sort:{'_id': -1}})
        .exec((err, movies) => {
            if(err){
                res.status(500).json({Error: err})
            } else {
                res.status(200).json({message: movies});
            }
        })
    } catch (exception) {
        console.log('Error: ' + exception)
    }
}