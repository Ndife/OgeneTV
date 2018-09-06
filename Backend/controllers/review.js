var Review = require('../models/review');
var mailer = require('../functions/mailer');

exports.addReview = function(req, res){
    try {
        var data = {
            time: Date.now(),
            review: req.body.review,
            email: req.body.email,
            name: req.body.name
        }
        Review.create(data, function(err){
            if(err){
                res.status(500).json({message: 'Error occured'})
            }else{
                var subject = 'Hello ' + data.name + ',';
                var mailBody = `Thank you very much for your contribution`;
                var buttonLink = "https:\/\/ogenetv-e9a52.firebaseapp.com";
                var buttonText = 'OGENE TV';
                mailer.subscriberAdded(details.email, subject, mailBody, buttonLink, buttonText, (err,info)=>{
                    if(err){
                        res.json({error:err});
                    }else {
                        res.status(201).json({message: 'Review created successfully'});
                    }
                });

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