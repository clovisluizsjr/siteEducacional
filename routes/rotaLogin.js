const express = require('express');
const LoginController = require('../controller/loginController');
const rotaLogin = express.Router();

const loginCtrl = new LoginController();

rotaLogin.get('/', loginCtrl.loginView);

module.exports = rotaLogin;
