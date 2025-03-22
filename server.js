const express = require('express');
const expressEjsLayout = require('express-ejs-layouts');
const rotaHome = require('./routes/rotaHome');
const rotaLogin = require('./routes/rotaLogin');
const rotaProfessor = require('./routes/rotaProfessor');
const app = express();
const porta = 5000;

app.set('views engine', 'ejs');
app.use(express.static('public'));
app.set('layout', 'layouts/layout');
app.use(expressEjsLayout);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/', rotaHome);
app.use('/login', rotaLogin);
app.use('/seeds/professor', rotaProfessor);
// app.use('/seeds/aluno', rotaAluno);   - - - Falta desenvolver - - -

app.listen(porta, function () {
  console.log(`Servidor em execução na porta: ${porta}`);
});
