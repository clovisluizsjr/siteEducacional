const expess = require('express');
const ProfessorController = require('../controller/professorController');
const AuthMiddleware = require('../middlewares/authMiddleware');

const router = expess.Router();

let ctrl = new ProfessorController();
let auth = new AuthMiddleware();
router.get('/', auth.validar, ctrl.home);
router.get('/series', auth.validar ,ctrl.listarSeries);
router.get('/alunos', auth.validar ,ctrl.listarAlunos);
router.get('/disciplina/:disciplinaId/:serieId', auth.validar ,ctrl.discipinaInfo);
router.get('/disciplina/:disciplinaId/:serieId/novaAtividade', auth.validar ,ctrl.cadastrarAtividadeView);
router.post('/atividade/cadastrar', auth.validar, ctrl.cadastrarAtividade);
router.get('/alterar/:id', auth.validar, ctrl.alterarView)
router.get("/excluir/:id", auth.validar, ctrl.excluir);

module.exports = router;
