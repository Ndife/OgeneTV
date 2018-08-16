
const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const checkAuth = require('../functions/check-auth');

router.post('/signUp',users.signUp);
router.get('/verify/:email',users.verify);
router.post('/login', users.logIn);

module.exports = router;