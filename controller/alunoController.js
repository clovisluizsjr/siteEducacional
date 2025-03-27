const AlunoModel = require('../models/alunoModel');
const AtividadeProfessorModel = require("../models/atividadeProfessorModel");
const DisciplinaModel = require('../models/disciplinaModel');
const ProfessorModel = require('../models/professorModel');
const SerieModel = require('../models/serieModel');

class AlunoController {
  home(req, res) {
    res.render('seeds/main.ejs', { layout: './layouts/layoutSeeds.ejs' });
  }

  async listarAlunos(req, res) {
    let alunos = new AlunoModel();
    let listaAlunos = await alunos.listar();
    let series = new SerieModel();
    let listaSeries = await series.listar();
    res.render('seeds/alunos.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      listaAlunos: listaAlunos,
      listaSeries: listaSeries,
    });
  }
  
  async listarSeries(req, res) {
    let professorId = req.session.usuario.professorId;
    let disciplinas = new DisciplinaModel();
    let listaDisciplinas = await disciplinas.listarProfessorPor(professorId); // será renderizado disciplinas apenas deste professor
    let series = new SerieModel();
    let listaSeries = await series.listar();
    res.render('seeds/series.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      listaDisciplinas: listaDisciplinas,
      listaSeries: listaSeries,
    });
  }

  async discipinaInfo(req, res) { // renderiza info das disciplinas + atividades já existentes
    const disciplinaId = req.params.disciplinaId;

    let disciplinas = new DisciplinaModel();
    let listaDisciplinas = await disciplinas.obter(disciplinaId);
    let series = new SerieModel();
    let listaSeries = await series.listar();
    let atividas = new AtividadeProfessorModel();
    let listaAtividades = await atividas.listarAtividadesPorDisciplina(disciplinaId);
    res.render('seeds/disciplina.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      listaDisciplinas: listaDisciplinas,
      listaSeries: listaSeries,
      listaAtividades,
    });
  }

}

module.exports = AlunoController;