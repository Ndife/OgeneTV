
var express = require('express');
var router = express.Router();
var users = require('../controllers/users');
var user1 = require('../controllers/userControllers')

router.post('/signUp', users.signUp);
router.get('/verify/:email', users.verify);
router.post('/login', users.logIn);
router.post('/buy', users.UserAddMovie);
router.get('/view/:id',users.UserWatchMovie);
//router.post('/buy',user1.getMovies);

module.exports = router;