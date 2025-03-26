const expess = require('express');
const ProfessorController = require('../controller/professorController');
const AuthMiddleware = require('../middlewares/authMiddleware');

const router = expess.Router();

let ctrl = new ProfessorController();
let auth = new AuthMiddleware();
router.get('/', auth.validar, ctrl.home);
// router.get('/alunos', ctrl.listarAlunos);
// router.get('/turmas', ctrl.listarDisciplinas);
// router.get('/disciplina/:disciplinaId/:serieId', ctrl.discipinaInfo);

module.exports = router;
