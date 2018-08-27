var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/category');

router.post('/add', categoryController.addCategory);
router.get('/', categoryController.getCategories);

module.exports = router;