const AlunoModel = require('../models/alunoModel');
const ProfessorModel = require('../models/professorModel');

class LoginController {
  loginView(req, res) {
    res.render('login.ejs', { layout: false });
  }

  async login(req, res) {
    //post
    const email = req.body.email;
    const senha = req.body.senha;
    let userResp = null;
    if (email.includes('@escola.com')) {
      let professorModel = new ProfessorModel();
      userResp = await professorModel.validar(email, senha);
    } else if (email.includes('@aluno.com')) {
      let alunoModel = new AlunoModel();
      userResp = await alunoModel.validar(email, senha);
    }
    if (userResp) {
      res.cookie('emailLogado', userResp);
      res.redirect('/seeds/professor');
    }

    res.render('login.ejs', {
      layout: false,
      mensagem: 'Dados inválidos',
      color: 'red',
    });
  }
}

module.exports = LoginController;
