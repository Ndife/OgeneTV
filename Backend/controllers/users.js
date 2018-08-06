const User = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'stilesndife@gmail.com',
        pass: 'j0sephbr0'
    }
  });
  function subscriberAdded(email){
    var mailOptions = {
        from: '"OgeneTV"',
        to: email,
        subject: 'Welcome to OgeneTV',
        html: `<center><h2><strong></string>Please verify your email address by clicking the link below</strong></h2>
                <div style="text-align:center; width: 50%; font-family:tahoma; columns: #909090;">
                <div style="background: wheat; padding:8%">
               
               <a href="https://www.google.com"><button style="color: red">Verify Email</button></a><br><br>
               <small>not working? Try copying and pasting the link below into your brower</small><br>
               <p> here</p>
               </div>
                </center>`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return false;
        } else {
          console.log('Email sent: ' + info.response);
          return true;
        }
      });
}



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
                        subscriberAdded(user.email)
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
