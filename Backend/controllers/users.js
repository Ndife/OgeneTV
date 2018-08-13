const User = require('../models/users');
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../functions/secretKey');
const mailer = require('../functions/mailer');

exports.signUp = (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.status(409).json({
                    message: 'email already exist'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                       res.status(500).json({
                            err: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            verified: false
                        })
                        user.save()
                            .then(docs => {
                                mailer.subscriberAdded(docs.email, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                        res.status(500).json({
                                            message: error
                                        });
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                        res.status(200).json({
                                            message: 'User created successfully',
                                            data: docs
                                        });
                                    }
                                });
                                

                            })
                            .catch(err => {
                                res.status(500).json({
                                    ErrMessage: 'Sorry error occur',
                                    err: err
                                });
                            })

                    }


                })
            }
        })

}


exports.verify = (req,res,next)=>{
    var email = req.params.email
      const user = new User({
          verified: true
      })
      User.find({email})
      .select('-__v -_id -password')
      .then(data =>{
          if(data.length<1){
              res.status(401).json({message:'email does not exist'})
          }else{
              User.update({email},user)
              .exec()
              .then(docs =>{
                  res.status(200).json({
                      message: 'email verified successfully',
                      data,
                  });
              })
              .catch(err =>{
                  res.status(500).json({
                      error: err
                  });
              });
          }
      })
      .catch(err =>{
          res.status(404).json({message:'Invalid email ID'})
      });
}


exports.logIn = (req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length<1){
            return res.status(401).json( {message:'email incorrect'});
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{

            if(err){
                return res.status(401).json({
                    message: 'password is incorrect'
                })
            }
            if(result){
               const token = jwt.sign({
                        email: user[0].email,
                        id: user[0]._id
                    }, 
                        `${key.secretkey()}`,
                );
               return res.status(200).json({
                    message:'login successful',
                    token,

                });
            }
            res.status(401).json({
                message:'password is incorrect'
            })
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    })
}



exports.getUser = (req, res, next) => {
    id = {id:req.params._id};
    User.find(id)
        .select('-__v -password')
        .exec()
        .then(user => {
            if (user.length < 0) {
                res.status(401).json({
                    message: 'User does not exist'
                });
            }else {
                res.status(200).json({
                    message: user
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err
            });
        })
}