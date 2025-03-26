class AuthMiddleware {
  async validar(req, res, next) {
    if (req.session.usuario) {
      res.locals.usuario = req.session.usuario;
      next();
    } else {
      res.redirect('/login');
    }
  }
}

module.exports = AuthMiddleware;
