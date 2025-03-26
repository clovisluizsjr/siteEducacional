const AlunoModel = require('../models/alunoModel');
const ProfessorModel = require('../models/professorModel');

class AuthMiddleware {
  async validar(req, res, next) {
    if (req.cookies.emailLogado) {
      let userModel;
      let userResp;
      const { emailLogado } = req.cookies;
      if (emailLogado.includes('@escola.com')) {
        userModel = new ProfessorModel();
      } else if (emailLogado.includes('@aluno.com')) {
        userModel = new AlunoModel();
      }
      userResp = await userModel.obterPor(emailLogado);
      if (userResp.length > 0) {
        res.locals.email = emailLogado;
        res.locals.usuario = userResp[0];
        next();
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
  }
}

module.exports = AuthMiddleware;
