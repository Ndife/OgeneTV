const User = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const movieModel = require('../models/movies');
const ObjectID = require('mongoose').Types.ObjectId;
const secret = require('../functions/secret')
const mailer = require('../functions/mailer');
const pay = require('../models/payment');


exports.signUp = (req, res, next) => {
    if ((req.body.password == "")) {
        res.status(203).json({ message: "Please provide a password" })
    } else {
        User.find({ email: req.body.email })
            .then(user => {
                if (user.length >= 1) {
                    res.status(201).json({ message: 'email already exist' })
                } else {
                    User.find({ name: req.body.username })
                        .then(name => {
                            if (name.length >= 1) {
                                res.status(202).json({ message: 'Username already exist' })
                            }
                        })
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            res.status(205).json({ err: err });
                        } else {
                            var user = ({
                                _id: new mongoose.Types.ObjectId(),
                                username: req.body.username,
                                email: req.body.email,
                                password: hash,
                                status: false
                            })
                            User.create(user, function(err, result){
                                console.log(result);
                                if (err) {
                                    res.status(203).json({ Message: 'email or username invalid' })
                                } else {
                                    var subject = 'Hello ' + user.username + ',';
                                    var mailBody = `We're really excited for you to join our online community. 
                                    You successfully created an account`
                                    var buttonLink = "https:\/\/ogenetv-e9a52.firebaseapp.com";
                                    var buttonText = 'OGENE TV';
                                    mailer.subscriberAdded(user.email, subject, mailBody, buttonLink, buttonText, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                            res.status(309).json({
                                                message: error
                                            });
                                        } else {
                                            console.log('Email sent: ' + info.response);
                                            res.status(200).json({
                                                message: 'User created successfully',
                                                username: user.username,
                                                email: user.email
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


exports.logIn = (req, res, next) => {
    if((req.body.password != '') && (req.body.email != '')){
        User.findOne({email: req.body.email})
        .exec(function(err, Currentuser){
                if (Currentuser == null){
                res.status(201).json({message : "email does not exist"});
                }
                else {
                    var validPassword =  bcrypt.compareSync(req.body.password, Currentuser.password);
                    if(!validPassword){
                        res.status(202).json({message : "email or password invalid"});
                    }
                    else{
                        var token = jwt.sign({email: Currentuser.email,id: Currentuser._id},secret.userKey,{expiresIn: "12h"});
                      let  profile = {
                          id: Currentuser._id,
                         username: Currentuser.username,
                         email: Currentuser.email,
                         movies: Currentuser.movies,
                         verified: Currentuser.verified,
                         status: Currentuser.status,

                        }
                        res.status(200).json({message : "Login Successful", token : token ,currentUser:profile});
                    }
                }
            
            
            })
    }else{
        res.status(203).json({message : "Please provide an email and a password"});

    }   
}
   

exports.UserAddMovie = function (req, res) {
    // var user = new ObjectID(req.body.user)
    // var movie = new ObjectID (req.body.movie)
    var d = new Date();
    var times = d.setDate(d.getDate() + 7)



    User.findById({ _id: req.body.user }, function (err, data) {
        if (data) {
            movieModel.findOne({ _id: req.body.movie }, function (err, data2) {
                if (!data2) {
                    res.json({ err: err, message: 'Movies Not Found !!' })

                } else {


                    if (JSON.stringify(data.movies).includes(JSON.stringify(data2._id))) {
                        res.json({ err: err, message: 'Movie Already Exists In Library!!' })

                    } else {
                        var details = {
                            user: req.body.user,
                            movie: req.body.movie,
                            time: times,
                            refNo: req.body.refNo,
                            Status: true
                        }
                        pay.create(details, function (err, paym) {
                            if (paym) {
                                movieModel.findByIdAndUpdate(data2, { $inc: { downloads: 1 } }, function (err, result) {
                                    if (result) {
                                        data.movies.push(data2._id)

                                        data.save()
                                        res.json({ message: 'Movie Purchase Successful' })

                                    } else {
                                        res.json({ err: err, message: 'Error Occured While Getting Movies !!' })
                                    }
                                })
                            } else {
                                res.json({ err: err, message: 'Error Making Payment !!' })
                            }

                        })


                    }

                }


            })
        } else {
            res.json({ err: err, message: 'User Not Found' })
        }
    })

}
exports.UserWatchMovie = function(req, res){
    var id= req.params.id
    User.findById(id,'_id', function(err, data){
        console.log(err)
        if(err)res.json({message:"an error occures"})
        res.json(data.movies)
    }).populate('movies','image')
}


exports.UserViewMovie = function (req, res) {
    var id = req.body.id
    var movieId = req.body.movie
    pay.find({ $and: [{ user: id }, { movie: movieId }] }, function (err, data){
        if(data){
        let currentDate = new Date();
                let newTime = new Date(+new Date(data[0].time) + 7 * 24 * 60 * 60 * 1000)
                if (currentDate >= newTime) {
                    res.json({err:err, message:'Sorry Your Subscription For This Movies has Expired !!'})
                    console.log('Am Expired...');
                }
                else {
                    movieModel.findById(movieId, function (err, data) {
                        if (err) res.json({ message: "an error occures" })
                        res.json({data})
                    })
                } 
            }else{
                res.json({err:err, message:'Movie not Found '})
            }
    })


}


exports.UserDeleteMovie = function (req, res) {
    var user = new ObjectID(req.body.user);
    var movies = new ObjectID(req.body.movies);
    User.findById({ _id: user }, function (err, user) {
        if (err) {
            res.json({ err: err, message: 'Error Occured While Finding User !!' })
        } else if (user) {
            movieModel.findById({ _id: movies }, function (err, data) {
                if (err) {
                    res.json({ err: err, message: 'Error Encountered While ' })
                } else if (data) {
                    let movieIndex = user.movies.findIndex(function (movie) {
                        return movie._id == data._id || movie._id == JSON.stringify(data._id);
                    });
                    user.movies.splice(movieIndex, 1);
                    user.save();

                    res.json({ message: 'user Successfully Deleted Movies ' })


                } else {
                    res.json({ err: err, message: 'Video Not Found !!' })
                }

            })

        } else {
            res.json({ err: err, message: 'User Not Found' })
        }
    })

}


exports.getEmail = (req,res) =>{
    var email = {email:req.body.email}
    User.findOne(email,(err,result)=>{
        if(err) {
            res.json(err);
        }else if(!result){
            res.json('Email does not exist');
        }else {
            var subject = 'Hello ' + result.username + ',';
            var mailBody = `We received a request for password change.<br>Please use the button below to set your new password`;
            var buttonLink = "https:\/\/ogenetv-e9a52.firebaseapp.com/updatePassword";
            var buttonText = 'UPDATE PASSWORD';
            mailer.subscriberAdded(result.email, subject, mailBody, buttonLink, buttonText, (err,info)=>{
                if(err){
                    console.log(err)
                    res.json({error:err});
                }else {
                    res.json('Please check your email to update your password');
                }
            });
           
        }  
       
    })
}

exports.changePassword = (req,res) =>{
    var email = {email:req.body.email};

    User.findOne(email,(err,result)=>{
        if(err) {
            res.json(err);
        }else if(!result){
            res.json('Email does not exist');
        }else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    res.status(205).json({ err: err });
                } else {
                        User.update(email,{password:hash},(err,succ)=>{
                    if(err){
                         res.json(err)
                        }else {
                            res.json('Password changed successfully')
                        }
                     })
                }
            })
        }
    })

    
}