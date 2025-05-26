const AlunoModel = require('../models/alunoModel');
const AtividadeModel = require('../models/atividadeModel');
const DisciplinaModel = require('../models/disciplinaModel');
const ProfessorModel = require('../models/professorModel');
const ProfessorTurmasDisciplinas = require('../models/professorTurmasDisciplinas');
const TurmaModel = require('../models/turmaModel');

class ProfessorController {
  home(req, res) {
    res.render('seeds/main.ejs', { layout: './layouts/layoutSeeds.ejs' });
  }

  async listarTurmas(req, res) {
    let professorId = req.session.usuario.userId;
    let turmas = new ProfessorTurmasDisciplinas();
    let listaTurmas = await turmas.listarPorProfessorId(professorId);
    res.render('seeds/turmas.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      listaTurmas: listaTurmas,
    });
  }

  async discipinaInfo(req, res) {
    // renderiza info das disciplinas + atividades já existentes
    const { turmaId, disciplinaId } = req.params;
    const professorId = req.session.usuario.userId;

    // 1. Verificar se o professor tem acesso a essa turma/disciplina
    let professores = new ProfessorModel();
    let validaAcesso = await professores.validaAcesso(
      professorId,
      turmaId,
      disciplinaId
    );

    if (!validaAcesso.length) {
      return res.send('<p>Usuário sem permissão</p>');
    }

    let turmas = new TurmaModel();
    let turmaInfo = await turmas.filtrarPorId(turmaId);

    let disciplinas = new DisciplinaModel();
    let disciplinaInfo = await disciplinas.obter(disciplinaId);

    let atividades = new AtividadeModel();
    let listaAtividades = await atividades.listarAtividades(validaAcesso[0].id);
    res.render('seeds/disciplina.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      turmaInfo: turmaInfo[0],
      disciplinaInfo: disciplinaInfo[0],
      listaAtividades,
    });
  }

  async cadastrarAtividadeView(req, res) {
    const { turmaId, disciplinaId } = req.params;
    const professorId = req.session.usuario.userId;
    let professores = new ProfessorModel();
    let validaAcesso = await professores.validaAcesso(
      professorId,
      turmaId,
      disciplinaId
    );
    if (!validaAcesso.length) {
      return res.send('<p>Usuário sem permissão</p>');
    }

    res.render('seeds/cadastrarAtividade.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      professorTurmaId: validaAcesso[0].id,
      turmaId,
      disciplinaId,
    });
  }

  async gravarAtividade(req, res) {
    const {
      titulo,
      descricao,
      data_inicial,
      data_limite,
      professor_turma_disciplina_id,
    } = req.body;

    if (
      titulo != '' &&
      descricao != '' &&
      data_inicial != '' &&
      data_limite != ''
    ) {
      let novaAtividade = new AtividadeModel(
        0,
        titulo,
        descricao,
        data_inicial,
        data_limite,
        professor_turma_disciplina_id
      );

      let ok;
      ok = await novaAtividade.gravarAtividade();

      if (ok) {
        res.send({ ok: true });
      } else {
        res.send({ ok: false });
      }
    } else {
      res.send({ ok: false });
    }
  }

  // //EXCLUIR

  async excluir(req, res) {
    //parametro id da url
    let ok = true;

    if (req.body.id) {
      let atividade = new AtividadeModel();
      ok = await atividade.excluirAtividade(req.body.id);
    } else {
      ok = false;
    }
    res.send({ ok: ok });
  }

  async atividadeAlunos(req, res) {
    const { turmaId, disciplinaId, atividadeId } = req.params;
    const professorId = req.session.usuario.userId;
    let professores = new ProfessorModel();
    let turmaProfessorId = await professores.validaAcesso(
      professorId,
      turmaId,
      disciplinaId
    );

    let alunos = new AlunoModel();
    let listaAtividades = await alunos.listarAlunos(
      atividadeId,
      turmaProfessorId[0].id
    );
    res.render('seeds/alunos.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      listaAtividades,
    });
  }
}

module.exports = ProfessorController;
