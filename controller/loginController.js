class LoginController {
  loginView(req, res) {
    res.render('login.ejs', { layout: false });
  }

  login() {
    //post
    const user = req.body.usuario;
    const senha = req.body.senha;

    /* Se for professor 
      res.render('seeds/professor.ejs', {
        layout: './layouts/layoutSeeds.ejs',
        rota: 'professor',
        imgUser: '../img/team-4.jpg',
        nomeUser: 'Professor Pandur',
      });
    */

    /* Se for aluno
      res.render('seeds/aluno.ejs', {
        layout: './layouts/layoutSeeds.ejs',
        rota: 'aluno',
        imgUser: '../img/class-4.jpg',
        nomeUser: 'Aninha',
      });
    */
  }
}

module.exports = LoginController;
