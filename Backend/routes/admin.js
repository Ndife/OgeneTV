var express = require('express');
var router = express.Router();
var app = express();
var session = require('express-session');
var adminControllers = require('../controllers/admin');
// var passport = require('passport');
var passport = require('../controllers/userControllers').passport;
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models/admin');
//  passport.use(new LocalStrategy(passport.authenticate()));

app.use(session({
    secret: 'compare me',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

function checkAuth(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.send(401, {message: 'not authorized'});
    }
};

router.post('/create', adminControllers.adminSignUp);
//router.post('/login', adminControllers.adminLogin);
router.post('/getUser', adminControllers.AdminGetUser);
router.get('/getUsers', adminControllers.AdminGetAllUsers);
router.post('/getAdmin', adminControllers.getAdmin);
router.get('/blockUser/:id', adminControllers.BlockUser);
router.get('/UnblockUser/:id', adminControllers.UnBlockUser);

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    // console.log({ e: email, p: password });
    // return done(null, {});
    adminControllers.getAdmin(email, function (err, admin) {
        if (err) throw err
        if (!admin) {
            return done(null, false, { message: 'User Unknown' })
        }
        adminControllers.decrypt(password, admin.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                return done(null, admin)
            } else {
                return done(null, false, { message: 'invalid password !!' })
            }
        })
    })
}))

passport.serializeUser(function (user, done) {
    done(null, user.id)

});
passport.deserializeUser(function (id, done) {
    adminControllers.getAdminByid(id, function (err, user) {
        done(err, user);

    });
});
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '' }),
    function (req, res) {
        res.json({ message: 'log in successful !!' })
    }
);
router.get('/logout/:id', function (req, res) {
    adminControllers.getUserByid
    req.logout();
    res.json({ message: 'logged out successful' })
})
module.exports = router;