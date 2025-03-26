const express = require('express');
const LoginController = require('../controller/loginController');
const router = express.Router();

const loginCtrl = new LoginController();

router.get('/', loginCtrl.loginView);
router.post('/', loginCtrl.login);
router.get('/logout', loginCtrl.logout);

module.exports = router;
