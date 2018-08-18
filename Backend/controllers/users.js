const User = require('../models/users');
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const movieModel = require('../models/movies');
const ObjectID = require('mongoose').Types.ObjectId;
const secret = require('../functions/secret')
const mailer = require('../functions/mailer');



exports.signUp = (req, res, next) => {
    if((req.body.password =="")){
        res.status(203).json({message : "Please provide a password"})
    }else {
    User.find({email: req.body.email})
        .then(user => {
            if (user.length >= 1)   res.status(201).json({message: 'email already exist'})
            else {
                User.find({name:req.body.name})
                .then(name=>{
                    if(name.length>=1) res.status(202).json({message: 'Username already exist'})
                })
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err)  res.status(205).json({ err: err}); 
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            name: req.body.name,
                            password: hash,
                            verified: false,
                            status: false 
                        })
                            user.save(function(err){
                                if(err){ res.status(203).json({Message: 'email or username invalid'})
                                }else {mailer.subscriberAdded(user.email, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                            res.status(309).json({
                                                message: error
                                            });
                                        } else {
                                            console.log('Email sent: ' + info.response);
                                            res.status(200).json({
                                                message: 'User created successfully',
                                                username:user.username,
                                                email:user.email
                                            });
                                        }
                                    });
                                }
                            })

                    }


                })
            }
        })
    }
}


exports.verify = (req, res, next) => {
    var email = req.params.email
    const user = new User({
        verified: true,
        status: true
    })
    User.find({email})
        .then(data => {
            if (data.length < 1) {
                res.status(401).json({message: 'email does not exist'})
            } else {
                User.update({email}, user)
                    .exec()
                    .then(docs => {
                        res.status(200).json({ message: 'email verified successfully',});
                    })
                    .catch(err => {
                        res.status(500).json({ error: err});
                     });
            }
        })
        .catch(err => {
            res.status(404).json({ message: 'Invalid email ID'})
        });
}




exports.logIn = (req, res, next) => {
    if((req.body.password != '') && (req.body.email != '')){
        User.findOne({email: req.body.email}).select('email password verified')
        .exec(function(err, Currentuser){
                if (Currentuser == null){
                res.status(201).json({message : "email does not exist"});
                }
                else{
                    u = Currentuser
                    if(u.verified == false){
                        res.status(205).json({message : "please verify your email to login"});
                    }else {
                    var validPassword =  bcrypt.compareSync(req.body.password, Currentuser.password);
                    if(!validPassword){
                        res.status(202).json({message : "email or password invalid"});
                    }
                    else{
                        var token = jwt.sign({email: Currentuser.email,id: Currentuser._id},secret.key,{expiresIn: "12h"}) 
                        res.status(200).json({message : "Login Successful", token : token});
                    }
                }
            }
            
            })
    }else{
        res.status(203).json({message : "Please provide an email and a password"});

    }   
}

exports.UserAddMovie = function(req, res){
    var user = new ObjectID(req.body.user)
    var movie = new ObjectID (req.body.movie)
    User.findById({_id:user}, function(err, data){
        if(data){
            movieModel.findOne({_id:movie} , function(err, data2){
                if(!data2){
                    res.json({err:err, message:'Movies Not Found !!'})

                }else{
             
                    
                    if(JSON.stringify(data.movies).includes(JSON.stringify(data2._id))  ){
                        res.json({err:err, message:'Movie Already Exists In Library!!'})

                    }else{
                        movieModel.findByIdAndUpdate(data2,{$inc:{downloads:1}},function(err, result){
                            if(result){
                                data.movies.push(data2._id)
                    
                                data.save()
                                res.json({message:'Movie Purchase Successful'})

                            }else{
                                res.json({err:err, message:'Error Occured While Getting Movies !!'})
                            }
                        })
                   
                    }

                }

             
            })
        }else{
            res.json({err:err,message:'User Not Found'})
        }
    })

}

exports.UserWatchMovie = function(req, res){
    var id= req.params.id
    User.findById(id, function(err, data){
        console.log(err)
        if(err)res.json({message:"an error occures"})
        res.json(data.movies)
    }).populate('movies')

}
