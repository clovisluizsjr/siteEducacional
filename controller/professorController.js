class ProfessorController {
  async homeSeed(req, res) {
    res.render('seeds/professor.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      rota: 'professor',
      imgUser: '/img/team-4.jpg', // Essas informações viram do banco
      nomeUser: 'Professor Pandur', // Essas informações viram do banco
    });
  }

  async listarAlunos(req, res) {
    res.render('seeds/alunos.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      rota: 'professor',
      imgUser: '/img/team-4.jpg', // Essas informações viram do banco
      nomeUser: 'Professor Pandur', // Essas informações viram do banco
    });
  }

  async listarDisciplinas(req, res) {
    res.render('seeds/disciplinas.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      rota: 'professor',
      imgUser: '/img/team-4.jpg', // Essas informações viram do banco
      nomeUser: 'Professor Pandur', // Essas informações viram do banco
      // Terá uma chave aqui com as disciplinas que serão renderizadas na tabela
    });
  }
}

module.exports = ProfessorController;
