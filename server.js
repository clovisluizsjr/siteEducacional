const express = require('express');
const session = require('express-session');
const expressEjsLayout = require('express-ejs-layouts');
const rotaHome = require('./routes/rotaHome');
const rotaLogin = require('./routes/rotaLogin');
const rotaProfessor = require('./routes/rotaProfessor');
const rotaAluno = require('./routes/rotaAluno');
const app = express();
const porta = 5000;

app.use(session({
  secret: 'sementes_do_futuro',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30 // 1000 milissegundos = 1 seg * 60 segundos = 1 minuto * 30 minutos 
  }
}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('layout', 'layouts/layoutSeeds');
app.use(expressEjsLayout);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', rotaHome);
app.use('/login', rotaLogin);
app.use('/seeds/professor', rotaProfessor);
app.use('/seeds/aluno', rotaAluno); 

app.listen(porta, function () {
  console.log(`Servidor em execução na porta: ${porta}`);
});
