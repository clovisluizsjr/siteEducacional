const expess = require('express');
const ProfessorController = require('../controller/professorController');
const AuthMiddleware = require('../middlewares/authMiddleware');

const router = expess.Router();

let ctrl = new ProfessorController();
let auth = new AuthMiddleware();
router.get('/', auth.validar, ctrl.home);
router.get('/turmas', auth.validar, ctrl.listarTurmas);
// router.get('/alunos', auth.validar ,ctrl.listarAlunos);
router.get(
  '/disciplina/:turmaId/:disciplinaId',
  auth.validar,
  ctrl.discipinaInfo
);
router.get(
  '/disciplina/:turmaId/:disciplinaId/novaAtividade',
  auth.validar,
  ctrl.cadastrarAtividadeView
);
router.post('/atividade/cadastrar', auth.validar, ctrl.gravarAtividade);
// router.get('/alterar/:id', auth.validar, ctrl.alterarView)
router.post('/atividade/excluir', auth.validar, ctrl.excluir);
router.get('/disciplina/:turmaId/:disciplinaId/:atividadeId', auth.validar, ctrl.atividadeAlunos)
module.exports = router;
