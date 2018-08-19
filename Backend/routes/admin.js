var express = require('express');
var router = express.Router();
var adminControllers = require('../controllers/admin');


router.post('/signUp', adminControllers.adminSignUp);
router.post('/getUser', adminControllers.getUser);
router.get('/getUsers', adminControllers.getAllUsers);
router.post('/getAdmin', adminControllers.getAdmin);
router.get('/blockUser/:id', adminControllers.BlockUser);
router.get('/unblockUser/:id', adminControllers.unBlockUser);

module.exports = router; 