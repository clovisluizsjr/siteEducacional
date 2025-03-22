class HomeController {
  home(req, res) {
    res.render('home.ejs', { layout: './layouts/layout.ejs' });
  }

  contato(req, res) {
    res.render('contato.ejs', { layout: './layouts/layout.ejs' });
  }

  sobre(req, res) {
    res.render('sobre.ejs', { layout: './layouts/layout.ejs' });
  }

  ensino(req, res) {
    res.render('ensino.ejs', { layout: './layouts/layout.ejs' });
  }

  professores(req, res) {
    res.render('professores.ejs', { layout: './layouts/layout.ejs' });
  }

  galeria(req, res) {
    res.render('galeria.ejs', { layout: './layouts/layout.ejs' });
  }

  jornal(req, res) {
    res.render('jornal.ejs', { layout: './layouts/layout.ejs' });
  }

  noticias(req, res) {
    res.render('noticias.ejs', { layout: './layouts/layout.ejs' });
  }
}

module.exports = HomeController;
