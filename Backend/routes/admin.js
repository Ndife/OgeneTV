var express = require('express');
var router = express.Router();
var adminControllers = require('../controllers/admin');


router.post('/signUp', adminControllers.adminSignUp);
router.get('/getUser/:id', adminControllers.getUser);
router.get('/getUsers', adminControllers.getAllUsers);
router.post('/getAdmin', adminControllers.getAdmin);
router.get('/blockUser/:id', adminControllers.BlockUser);
router.get('/unblockUser/:id', adminControllers.unBlockUser);
router.get('/getAllAdmin',adminControllers.getAllAdmin);
router.get('/searchAdmin/:value',adminControllers.searchAdmin)
      .get('/searchUser/:value',adminControllers.searchUser)
      .get('/deleteUser/:id',adminControllers.deleteUser)
      .get('/deleteAdmin/:id',adminControllers.deleteAdmin)
      .post('/forgotPass',adminControllers.forgotPass)
      .post('/login',adminControllers.adminLogin)
      .post('/updateAdmin/:id',adminControllers.updateAdmin)
module.exports = router;   
