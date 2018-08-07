
const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.post('/signUp', users.signUp);
router.post('/verify/:email', users.verify);

module.exports = router;