const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.post('/signUp', users.signUp);


module.exports = router;