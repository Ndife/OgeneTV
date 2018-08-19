var express = require('express');
var router = express.Router();
var adminControllers = require('../controllers/admin');


router.post('/signUp', adminControllers.adminSignUp);
router.post('/getUser', adminControllers.getUser);
router.get('/getUsers', adminControllers.getAllUsers);
router.post('/getAdmin', adminControllers.getAdmin);
router.get('/blockUser/:id', adminControllers.BlockUser);
router.get('/unblockUser/:id', adminControllers.unBlockUser);
router.get('/getAllAdmin',adminControllers.getAllAdmin);
router.get('/searchAdmin/:value',adminControllers.searchAdmin);


module.exports = router; 