var express = require('express');
var router = express.Router();
var app = express();
var session = require('express-session');
var adminControllers = require('../controllers/admin');


router.post('/create', adminControllers.adminSignUp);
router.post('/getUser', adminControllers.adminGetUser);
router.get('/getUsers', adminControllers.adminGetAllUsers);
router.post('/getAdmin', adminControllers.getAdmin);
router.get('/blockUser/:id', adminControllers.BlockUser);
router.get('/unblockUser/:id', adminControllers.unBlockUser);

module.exports = router;