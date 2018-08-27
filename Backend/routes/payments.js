var express = require('express');
var router = express.Router();
var paymentControllers = require('../controllers/payment')

//create payments for movies
//router.post('/',paymentControllers.CreatePayments);
router.get('/',paymentControllers.viewPayments);


module.exports = router;