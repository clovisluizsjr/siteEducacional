class HomeController {
  home(req, res) {
    res.render('home.ejs');
  }

  contato(req, res) {
    res.render('contato.ejs');
  }

  sobre(req, res) {
    res.render('sobre.ejs');
  }

  ensino(req, res) {
    res.render('ensino.ejs');
  }

  professores(req, res) {
    res.render('professores.ejs');
  }

  galeria(req, res) {
    res.render('galeria.ejs');
  }

  jornal(req, res) {
    res.render('jornal.ejs');
  }

  noticias(req, res) {
    res.render('noticias.ejs');
  }
}

module.exports = HomeController;
