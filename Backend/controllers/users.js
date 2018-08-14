const User = require('../models/users');
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../functions/secretKey');
const mailer = require('../functions/mailer');


exports.signUp = (req, res, next) => {
    if((req.body.password =="")){
        res.status(203).json({message : "Please provide a password"})
    }else {
    User.find({email: req.body.email})
        .then(user => {
            if (user.length >= 1)   res.status(201).json({message: 'email already exist'})
            else {
                User.find({username:req.body.username})
                .then(username=>{
                    if(username.length>=1) res.status(202).json({message: 'Username already exist'})
                })
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err)  res.status(205).json({ err: err}); 
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            username: req.body.username,
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
        verified: true
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
    if((req.body.password != null && req.body.password != undefined) && (req.body.email != null && req.body.email != undefined)){
        User.findOne({
                    email: req.body.email
                }).select('email password')
                .exec(function(err, Currentuser){
                    if (err) throw err;
                        if (Currentuser == null){

                        res.status(201).json({message : "user does not exist"});
                        }
                        else{
                            var validPassword =  bcrypt.compareSync(req.body.password, Currentuser.password);
                            if(!validPassword){
                                res.status(202).json({message : "username or password invalid"});
                            }
                            else{
                                var token = jwt.sign({email: Currentuser.email,id: Currentuser._id},`${key.secretkey()}`)
                                res.status(200).json({message : "Login Successful", token : token});
                            }
                        }
                    })
                }else{
                    res.status(203).json({message : "Please provide an email and a password"});

                }
}

 