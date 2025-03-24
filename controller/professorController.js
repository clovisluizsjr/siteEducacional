const AlunoModel = require('../models/alunoModel');
const DisciplinaModel = require('../models/disciplinaModel');
const SerieModel = require('../models/serieModel');
const TurmaModel = require('../models/turmaModel');

class ProfessorController {
  async homeSeed(req, res) {
    res.render('seeds/professor.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      rota: 'professor',
      imgUser: '/img/team-4.jpg', // Essas informações viram do login
      nomeUser: 'Professor Pandur', // Essas informações viram do login
    });
  }

  async listarAlunos(req, res) {
    let alunos = new AlunoModel();
    let listaAlunos = await alunos.listar();
    let turmas = new TurmaModel();
    let listaTurmas = await turmas.listar();
    let series = new SerieModel();
    let listaSeries = await series.listar();
    res.render('seeds/alunos.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      rota: 'professor',
      imgUser: '/img/team-4.jpg', // Essas informações viram do login
      nomeUser: 'Professor Pandur', // Essas informações viram do login
      listaAlunos: listaAlunos,
      listaTurmas: listaTurmas,
      listaSeries: listaSeries,
    });
  }

  async listarDisciplinas(req, res) {
    let professorId = 1; // Supor que foi o professor do id 1 que fez o login
    let disciplinas = new DisciplinaModel();
    let listaDisciplinas = await disciplinas.listar(professorId); // será renderizado disciplinas apenas deste professor
    let series = new SerieModel();
    let listaSeries = await series.listar();
    res.render('seeds/turmas.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      rota: 'professor',
      imgUser: '/img/team-4.jpg', // Essas informações viram do login
      nomeUser: 'Professor Pandur', // Essas informações viram do login
      listaDisciplinas: listaDisciplinas,
      listaSeries: listaSeries,
    });
  }

  async discipinaInfo(req, res) {
    const id = req.params.id;
    let disciplinas = new DisciplinaModel();
    let listaDisciplinas = await disciplinas.listar(professorId);
    let series = new SerieModel();
    let listaSeries = await series.listar();
    res.render('seeds/disciplina.ejs');
  }
}

module.exports = ProfessorController;
