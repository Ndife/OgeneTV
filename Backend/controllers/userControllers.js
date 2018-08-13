var  passport = require('passport');
var facebookStartegy = require('passport-facebook').Strategy;
var key = require('../config/key');
var User = require('../models/user1');
var bcrypt = require('bcrypt');
//passport sign up with facebook

passport.serializeUser((user,done)=>{
    done(null,user.id)

})
passport.deserializeUser((id, done)=>{
    User.findById(id).exec()
    .then(user =>{
        done(null, user.id);
    })
    .catch(err =>{
        console.log(err);
    })

})

// facebook pasport
passport.use(new facebookStartegy({
    clientID:key.facebook.clientID,
    clientSecret:key.facebook.clientSecret,
    callbackURL:'/auth/facebook/redirect',
    passReqToCallback:true,
    profileFields:['id','displayName','picture','email']
},(req, accessToken, refreshToken, profile , done)=>{
    if(profile){
        User.findOne({facebookId: profile.id})
        .exec()
        .then(currentUser =>{
            if(currentUser){
                console.log('This is the current User ' + currentUser)
                done(null, currentUser);
            }else{
                var  newUser = new User({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    verified:true,
                    status:true,
                    password:''
                });
                
                return newUser.save()
                .then(result =>{
                    console.log('New user created'+ result)
                    done(null, result);
                })
                .catch(err =>{
                    console.log(err)
                });
            }

        })
    }else{
        console.log("there is an error somewhere !!")
    }
  
    
 }))
module.exports = {
    passport: passport
};