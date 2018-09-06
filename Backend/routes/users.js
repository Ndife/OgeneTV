

const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const checkAuth = require('../functions/check-auth');
var user1 = require('../controllers/userControllers')


router.post('/signUp',users.signUp);
router.post('/login', users.logIn);
router.post('/buy', users.UserAddMovie);
router.get('/view/:id',users.UserWatchMovie);
router.post('/delete', users.UserDeleteMovie);
router.get('/watch',users.UserViewMovie);
router.post('/getEmail',users.getEmail);
router.post('/changePassword',users.changePassword);


module.exports = router; 