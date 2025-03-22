const express = require('express');
const LoginController = require('../controller/loginController');
const router = express.Router();

const loginCtrl = new LoginController();

router.get('/', loginCtrl.loginView);

module.exports = router;
