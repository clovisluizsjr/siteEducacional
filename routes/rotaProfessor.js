const expess = require('express');
const ProfessorController = require('../controller/professorController');

const router = expess.Router();

let ctrl = new ProfessorController();
router.get('/', ctrl.homeSeed);
router.get('/alunos', ctrl.listarAlunos);
router.get('/turmas', ctrl.listarDisciplinas);
router.get('/disciplina/:disciplinaId/:serieId', ctrl.discipinaInfo);

module.exports = router;
