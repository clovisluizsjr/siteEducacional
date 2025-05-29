const AlunoModel = require('../models/alunoModel');
const AtividadeModel = require('../models/atividadeModel');
const EntregaModel = require('../models/entregaModel');
const ItensQuadroNotasModel = require('../models/itensQuadroNotas');
const QuadroNotasModel = require('../models/quadroNotasModel');

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
      professorTurmaId,
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
      aindaNoPrazo,
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

  async listarDisciplinasQuadro(req, res) {
    let alunoRA = req.session.usuario.userId;
    let alunos = new AlunoModel();
    let listaDisciplinas = await alunos.listarProfessoresEDisciplinas(alunoRA);

    res.render('seeds/aluno/quadroNotas.ejs', {
      layout: './layouts/layoutSeeds',
      listaDisciplinas,
    });
  }

  async quadroNotasAluno(req, res) {
    let alunoRA = req.session.usuario.userId;
    let { professorTurmaId } = req.params;

    let itensQuadroModel = new ItensQuadroNotasModel();
    let listaQuadroFinal = await itensQuadroModel.getQuadroAluno(
      alunoRA,
      professorTurmaId
    );

    res.render('seeds/aluno/quadroNotasAluno.ejs', {
      layout: './layouts/layoutSeeds',
      listaQuadroFinal,
    });
  }

  async listarQuadroNotas(req, res) {
    const entregaModel = new EntregaModel();
    const itensModel = new ItensQuadroNotasModel();
    const alunoRA = req.session.usuario.userId;

    const alunoModel = new AlunoModel();
    const disciplinas = await alunoModel.listarProfessoresEDisciplinas(alunoRA);

    const listaDisciplinas = [];

    for (const disc of disciplinas) {
      const pesos = await itensModel.getPesosPorDisciplina(disc.codigo);
      const entregas = await entregaModel.getNotasPorAlunoEDisciplina(
        alunoRA,
        disc.codigo
      );

      let somaNotas = 0;
      let somaPesos = 0;

      entregas.forEach((entrega) => {
        const pesoItem = pesos.find(
          (p) => p.atividade_id === entrega.atividade_id
        );
        if (pesoItem && entrega.nota !== null) {
          somaNotas += entrega.nota * pesoItem.peso;
          somaPesos += pesoItem.peso;
        }
      });

      const media = somaPesos > 0 ? (somaNotas / somaPesos).toFixed(2) : 0;
      const status = media >= 6 ? 'Aprovado' : 'Reprovado';

      listaDisciplinas.push({
        disciplina: disc.disciplina,
        professor: disc.professor,
        media,
        status,
        professorTurmaId: disc.professorTurmaId,
      });
    }
    res.render('seeds/aluno/quadroNotas.ejs', { listaDisciplinas });
  }
}
module.exports = AlunoController;
