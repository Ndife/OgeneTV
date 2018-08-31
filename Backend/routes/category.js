var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/category');

router.post('/add', categoryController.addCategory);
router.get('/', categoryController.getCategories);
router.get('/delete/:id', categoryController.deleteCategory);

module.exports = router;