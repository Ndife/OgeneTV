var express = require('express');
var router = express.Router();

var adminControllers = require('../controllers/admin');


router.post('/create', adminControllers.adminSignUp);
router.post('/getUser', adminControllers.AdminGetUser);
router.get('/getUsers', adminControllers.AdminGetAllUsers);
router.post('/getAdmin', adminControllers.getAdmin);
router.get('/blockUser/:id', adminControllers.BlockUser);
router.get('/unblockUser/:id', adminControllers.unBlockUser);



module.exports = router;