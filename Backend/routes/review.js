var express = require('express');
var router = express.Router();
var reviewController = require('../controllers/review');

router.post('/add', reviewController.addReview);
router.get('/', reviewController.getReview);

module.exports = router;