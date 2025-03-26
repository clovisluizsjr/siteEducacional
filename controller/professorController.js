const AlunoModel = require('../models/alunoModel');
const DisciplinaModel = require('../models/disciplinaModel');
const ProfessorModel = require('../models/professorModel');
const SerieModel = require('../models/serieModel');
const TurmaModel = require('../models/turmaModel');

class ProfessorController {
  async homeSeed(req, res) {
    let professorId = 1;
    let professores = new ProfessorModel();
    let professorInfo = await professores.obter(professorId);
    console.log(professorInfo[0]);
    res.render('seeds/professor.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      rota: 'professor',
      imgUser: '/img/team-4.jpg', // Essas informações viram do login, ainda não tem imagem no banco
      nomeUser: 'professorInfo', // Essas informações viram do login, para renderizar o nome na side bar
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
    let listaDisciplinas = await disciplinas.listarProfessorPor(professorId); // será renderizado disciplinas apenas deste professor
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
    const disciplinaId = req.params.disciplinaId;

    let disciplinas = new DisciplinaModel();
    let listaDisciplinas = await disciplinas.obter(disciplinaId);
    let series = new SerieModel();
    let listaSeries = await series.listar();
    res.render('seeds/disciplina.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      rota: 'professor',
      imgUser: '/img/team-4.jpg', // Essas informações viram do login
      nomeUser: 'Professor Pandur', // Essas informações viram do login
      listaDisciplinas: listaDisciplinas,
      listaSeries: listaSeries,
    });
  }
}

module.exports = ProfessorController;
