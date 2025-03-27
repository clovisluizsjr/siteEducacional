const AlunoModel = require('../models/alunoModel');
const AtividadeProfessorModel = require("../models/atividadeProfessorModel");
const DisciplinaModel = require('../models/disciplinaModel');
const ProfessorModel = require('../models/professorModel');
const SerieModel = require('../models/serieModel');
const AtividadeAlunoModel = require('../models/atividadeAlunoModel');

class AlunoController {
  home(req, res) {
    res.render('seeds/main.ejs', { layout: './layouts/layoutSeeds.ejs' });
  }

  async listagemAlunoDisciplina(req, res) {

    const alunoRA = req.session.usuario.alunoRA;

    // Busca atividades com nome da disciplina
    const atividadesModel = new AtividadeAlunoModel();
    const listaAtividades = await atividadesModel.listarAtividades(alunoRA);

    // Busca disciplinas da série do aluno
    const disciplinasModel = new DisciplinaModel();
    const listaDisciplinas = await disciplinasModel.listarPorAluno(alunoRA);

    res.render('seeds/atividades', {
      layout: './layouts/layoutSeeds',
      listaAtividades: listaAtividades,
      listaDisciplinas: listaDisciplinas,
      usuario: req.session.usuario
    });



  }
  async listagemProfessores(req, res) {
   
        const alunoRA = req.session.usuario.alunoRA;

        // Busca professores e disciplinas do aluno
        const alunoModel = new AlunoModel();
        const professoresDisciplinas = await alunoModel.listarProfessoresEDisciplinas(alunoRA);

        res.render('seeds/professores', {
            layout: './layouts/layoutSeeds',
            professoresDisciplinas: professoresDisciplinas,
            usuario: req.session.usuario
        });
    
}
}

module.exports = AlunoController;