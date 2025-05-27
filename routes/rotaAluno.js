const express = require('express');
const multer = require('multer');
const alunoController = require('../controller/alunoController');
const AuthMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

let ctrl = new alunoController();
let auth = new AuthMiddleware();

let storage = multer.diskStorage({
    filename(req, file, cb) {
        let nomeArq = "prd-" + Date.now() + "." + file.mimetype.split("/").pop();
        cb(null, nomeArq);
    }
})

let upload = multer({storage});

// Rotas básicas do aluno
router.get('/', auth.validar, ctrl.home);
router.get('/disciplinas', auth.validar, ctrl.listarDisciplinas); //seeds/aluno/disciplinas
router.get('/atividades/:professorTurmaId',auth.validar, ctrl.listarAtividades);
router.get('/atividades/info/:atividadeId', auth.validar, ctrl.atividadeInfo)
router.post('/atividade/entrega', auth.validar, ctrl.entregaAtividade)

module.exports = router;
