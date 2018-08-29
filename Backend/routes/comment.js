var express = require('express');
var router = express.Router();
var commentController = require('../controllers/comment');

router.post('/add', commentController.addComment);
router.get('/', commentController.getComments);
router.get('/delete/:id', commentController.deleteComment);

module.exports = router;