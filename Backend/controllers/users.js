const User = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



exports.signUp = (req,res,next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length>=1){
            return res.status(409).json({
                    message: 'email already exist'
                }   
            )
        }else {
            bcrypt.hash(req.body.password,10, (err, hash)=>{
                if(err){
                   return res.status(500).json({err:err});
                }else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(), 
                        email: req.body.email,
                        password: hash, 
                        verified:false
                    })
                    user.save()
                    .then(docs =>{
                        return res.status(201).json({
                            message: 'User created successfully',
                            email: docs.email,
                            verified: docs.verified,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:500/users/' + docs.email
                            }
                        })
                     
                    })
                    .catch(err =>{
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
                      request:{
                          type:'GET',
                          url: `http://localhost:3000/user/` 
                      }
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
