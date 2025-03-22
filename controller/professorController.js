class ProfessorController {
  async homeSeed(req, res) {
    res.render('seeds/professor.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      rota: 'professor',
      imgUser: '../img/team-4.jpg',
      nomeUser: 'Professor Pandur',
    });
  }
}

module.exports = ProfessorController;
