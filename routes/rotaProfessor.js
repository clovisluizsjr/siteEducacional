const expess = require('express');
const ProfessorController = require('../controller/professorController');

const router = expess.Router();

let ctrl = new ProfessorController();
router.get('/', ctrl.homeSeed);

module.exports = router;
