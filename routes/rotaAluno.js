const express = require('express');
const alunoController = require('../controller/alunoController');
const AuthMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

let ctrl = new alunoController();
let auth = new AuthMiddleware();

// Rotas básicas do aluno
router.get('/', auth.validar, ctrl.home);
// router.get('/atividades', auth.validar, ctrl.listagemAlunoDisciplina);
// router.get('/professores',auth.validar, ctrl.listagemProfessores);

module.exports = router;
