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
router.get('/disciplina/:turmaId/:disciplinaId/:atividadeId/altera',
  auth.validar,
  ctrl.cadastrarAtividadeView
)
router.get(
  '/disciplina/:turmaId/:disciplinaId/quadroNotas',
  auth.validar,
  ctrl.quadroNotasView 
);

router.post('/atividade/cadastrar', auth.validar, ctrl.gravarAtividade);
router.put('/atividade/alterar', auth.validar, ctrl.gravarAtividade)
router.post('/atividade/excluir', auth.validar, ctrl.excluir);
router.get('/disciplina/:turmaId/:disciplinaId/:atividadeId/corrige', auth.validar, ctrl.atividadeAlunos)
module.exports = router;
