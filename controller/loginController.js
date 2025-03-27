const AlunoModel = require('../models/alunoModel');
const ProfessorModel = require('../models/professorModel');

class LoginController {
  loginView(req, res) {
    res.render('login.ejs', { layout: false });
  }

  async login(req, res) {
    //post
    const { email, senha} = req.body;
    let userModel;
    let direcionaRota;
    if (email.includes('@escola.com')) {
      userModel = new ProfessorModel();
      direcionaRota = '/seeds/professor'
    } else if (email.includes('@aluno.com')) {
      userModel = new AlunoModel();
      direcionaRota = '/seeds/aluno'
    }
    if (userModel) {
      const user = await userModel.validar(email, senha);
      if(user) {
        req.session.usuario = {
          email: email.includes('@escola.com') ? user.professor_email : user.aluno_email,
          nome:  email.includes('@escola.com') ? user.professor_nome : user.aluno_nome,
          professorId : email.includes('@escola.com') && user.professor_id,
          tipo: email.includes('@escola.com') ? 'professor' : 'aluno',
        }
        return res.redirect(direcionaRota);
      }
    }

    res.render('login.ejs', {
      layout: false,
      mensagem: 'Dados inválidos',
      color: 'red',
    });
  }

  logout(req, res) {
    res.redirect('/');
  }
}

module.exports = LoginController;
