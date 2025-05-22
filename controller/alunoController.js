const AlunoModel = require('../models/alunoModel');
const DisciplinaModel = require('../models/disciplinaModel');
const ProfessorModel = require('../models/professorModel');

class AlunoController {
  home(req, res) {
    res.render('seeds/main.ejs', { layout: './layouts/layoutSeeds.ejs' });
  }

  // async listagemAlunoDisciplina(req, res) {
  //   let alunoRA = req.session.usuario.userId;
  //   let atividadesModel = new AtividadeAlunoModel();
  //   let listaAtividades = await atividadesModel.listarAtividades(alunoRA);
  //   let disciplinasModel = new DisciplinaModel();
  //   let listaDisciplinas = await disciplinasModel.listarPorAluno(alunoRA);

  //   res.render('seeds/atividades', {
  //     layout: './layouts/layoutSeeds',
  //     listaAtividades: listaAtividades,
  //     listaDisciplinas: listaDisciplinas,
  //   });
  // }

  // async listagemProfessores(req, res) {
  //   let alunoRA = req.session.usuario.userId;

  //   let alunoModel = new AlunoModel();
  //   let professoresDisciplinas = await alunoModel.listarProfessoresEDisciplinas(
  //     alunoRA
  //   );

  //   res.render('seeds/professores', {
  //     layout: './layouts/layoutSeeds',
  //     professoresDisciplinas: professoresDisciplinas,
  //   });
  // }
}

module.exports = AlunoController;
