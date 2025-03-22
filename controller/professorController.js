const AlunoModel = require('../models/alunoModel');
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
    res.render('seeds/disciplinas.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      rota: 'professor',
      imgUser: '/img/team-4.jpg', // Essas informações viram do login
      nomeUser: 'Professor Pandur', // Essas informações viram do login
      // Terá uma chave aqui com as disciplinas que serão renderizadas na tabela
    });
  }
}

module.exports = ProfessorController;
