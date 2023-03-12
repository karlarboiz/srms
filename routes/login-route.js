const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/login-controllers');

router.get('/log-in',loginControllers.loginMainPage)

router.post('/log-in/enter', loginControllers.loginEnter)

router.get('/welcome',loginControllers.loginWelcome)


module.exports = router;