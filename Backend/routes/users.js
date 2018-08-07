const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.post('/signUp', users.signUp);
router.post('/verify/:email', users.verify);
router.post('/login', users.logIn);

module.exports = router;