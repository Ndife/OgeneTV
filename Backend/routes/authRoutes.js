var express  = require('express');
var router = express.Router();
// var passport = require('passport');
var passport = require('../controllers/userControllers').passport;

router.get('/login', (req ,res) =>{
    res.render('login');
    
})

router.get('/logout', (req,res)=>{
    res.send('login out....')
});

router.get('/facebook', passport.authenticate('facebook',{
    scope:['user_friends' , 'manage_pages']
}))
// callback for google redirect
router.get('/facebook/redirect', passport.authenticate('facebook'), (req,res)=>{
    //var id = req.user._id;
    //res.redirect('/profile/');
     res.send(req.user);
})

// router.get('/google', passport.authenticate('google',{
//     scope:['profile']
// }))
// // callback for google redirect
// router.get('/google/redirect', passport.authenticate('google'), (req,res)=>{
//     var id = req.user._id;
//      res.redirect('/profile/'+id)
//     //res.send(req.user);
// })
module.exports = router;