var express = require('express');
var router = express.Router();
var adminControllers = require('../controllers/admin');
router.post('/create', adminControllers.adminSignUp);
router.post('/login', adminControllers.AdminLogin);
router.post('/getUser', adminControllers.AdminGetUser);
router.get('/getUsers', adminControllers.AdminGetAllUsers);
router.get('/blockUser/:id', adminControllers.BlockUser);
router.get('/UnblockUser/:id', adminControllers.unBlockUser);;


module.exports = router;