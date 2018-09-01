var Review = require('../models/review');

exports.addReview = function(req, res){
    try {
        var data = {
            time: Date.now(),
            review: req.body.review
        }
        Review.create(data, function(err){
            if(err){
                res.status(500).json({message: 'Error occured'})
            }else{
                res.status(201).json({message: 'Review created successfully'})
            }
        })
    } catch (exception) {
        console.log('Error: ' + exception);
    }
}

exports.getReview = function(req, res){
    try {
        Review.find(function(err, reviews){
            if(err){
                res.status(500).json({message: 'Error occured'})
            }else if(reviews.length == 0){
                res.status(200).json({message: 'List of reviews is empty'})
            }else{
                res.status(200).json(reviews)
            }
        })
    } catch (exception) {
        console.log('Error: ' + exception);
    }
}