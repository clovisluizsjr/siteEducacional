class LoginController {
  loginView(req, res) {
    res.render('login.ejs', { layout: false });
  }

  login() {
    //post
    const user = req.body.usuario;
    const senha = req.body.senha;
  }
}

module.exports = LoginController;
