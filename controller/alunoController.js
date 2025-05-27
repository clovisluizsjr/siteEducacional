const AlunoModel = require('../models/alunoModel');
const AtividadeModel = require('../models/atividadeModel');
const EntregaModel = require('../models/entregaModel');

class AlunoController {
  home(req, res) {
    res.render('seeds/main.ejs', { layout: './layouts/layoutSeeds.ejs' });
  }

  async listarDisciplinas(req, res) {
    let alunoRA = req.session.usuario.userId;
    let alunos = new AlunoModel();
    let listaDisciplinas = await alunos.listarProfessoresEDisciplinas(alunoRA);

    res.render('seeds/aluno/disciplinas.ejs', {
      layout: './layouts/layoutSeeds',
      listaDisciplinas,
    });
  }

  async listarAtividades(req, res) {
    let { professorTurmaId } = req.params;
    let atividades = new AtividadeModel();
    let listaAtividades = await atividades.listarAtividades(professorTurmaId);

    res.render('seeds/aluno/atividades.ejs', {
      layout: './layouts/layoutSeeds',
      listaAtividades,
    });
  }


  async atividadeInfo(req, res) {
    let { atividadeId } = req.params;
    let alunoRA = req.session.usuario.userId;

    let atividades = new AtividadeModel();
    let entrega = new EntregaModel();

    let atividade = (await atividades.obterAtividadePor(atividadeId))[0];

    // ALUNO JA ENTREGOU ATIVIDADE?
    let entregaExistente = await entrega.obterEntrega(atividadeId, alunoRA);

    // AINDA ESTA NO PRAZO?
    let aindaNoPrazo = new Date(atividade.data_fim) >= new Date();

    res.render('seeds/aluno/entregarAtividade.ejs', {
      layout: './layouts/layoutSeeds',
      atividade,
      alunoRA,
      entrega: entregaExistente,
      aindaNoPrazo
    });
  }


  async entregaAtividade(req, res) {
    const {
      entrega_id,
      atividade_id,
      aluno_RA,
      professor_turma_disciplina_id,
      data_entrega,
      anotacoes,
      status,
    } = req.body;

    if (
      atividade_id != '' &&
      aluno_RA != '' &&
      professor_turma_disciplina_id != '' &&
      data_entrega != '' &&
      anotacoes != '' &&
      status != ''
    ) {

      let novaEntrega = new EntregaModel();
      novaEntrega.entrega_id = entrega_id;
      novaEntrega.atividade_id = atividade_id;
      novaEntrega.aluno_RA = aluno_RA;
      novaEntrega.professor_turma_disciplina_id = professor_turma_disciplina_id;
      novaEntrega.data_entrega = data_entrega;
      novaEntrega.anotacoes = anotacoes;
      novaEntrega.status = status;

      let ok;
      ok = await novaEntrega.gravaAtividade();
      if (ok) {
        res.send({ ok: true });
      } else {
        res.send({ ok: false });
      }
    } else {
      res.send({ ok: false });
    }
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
