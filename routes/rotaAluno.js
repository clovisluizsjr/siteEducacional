const express = require('express');
const ProfessorController = require('../controller/professorController');
const AuthMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

let ctrl = new ProfessorController();
let auth = new AuthMiddleware();
router.get('/', auth.validar, ctrl.home);
router.get('/series', auth.validar ,ctrl.listarSeries);
// router.get('/turmas', ctrl.listarDisciplinas);
router.get('/disciplina/:disciplinaId/:serieId', ctrl.discipinaInfo);

module.exports = router;