const AlunoModel = require('../models/alunoModel');
const AtividadeModel = require('../models/atividadeModel');
const DisciplinaModel = require('../models/disciplinaModel');
const EntregaModel = require("../models/entregaModel");
const ProfessorModel = require('../models/professorModel');
const ProfessorTurmasDisciplinas = require('../models/professorTurmasDisciplinas');
const TurmaModel = require('../models/turmaModel');
const ItensQuadroNotasModel = require('../models/itensQuadroNotas')
const QuadroNotasModel = require('../models/quadroNotasModel');

class ProfessorController {
  home(req, res) {
    res.render('seeds/main.ejs', { layout: './layouts/layoutSeeds.ejs' });
  }

  async listarTurmas(req, res) {
    let professorId = req.session.usuario.userId;
    let turmas = new ProfessorTurmasDisciplinas();
    let listaTurmas = await turmas.listarPorProfessorId(professorId);
    res.render('seeds/professor/turmas.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      listaTurmas: listaTurmas,
    });
  }

  async discipinaInfo(req, res) {
    const { turmaId, disciplinaId } = req.params;
    const professorId = req.session.usuario.userId;

    // Verificar se o professor tem acesso
    let professores = new ProfessorModel();
    let validaAcesso = await professores.validaAcesso(professorId, turmaId, disciplinaId);

    if (!validaAcesso.length) {
      return res.send('<p>Usuário sem permissão</p>');
    }

    let turmas = new TurmaModel();
    let turmaInfo = await turmas.filtrarPorId(turmaId);

    let disciplinas = new DisciplinaModel();
    let disciplinaInfo = await disciplinas.obter(disciplinaId);

    let atividades = new AtividadeModel();
    let listaAtividades = await atividades.listarAtividades(validaAcesso[0].id);

    res.render('seeds/professor/disciplina.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      turmaInfo: turmaInfo[0],
      disciplinaInfo: disciplinaInfo[0],
      listaAtividades,
      professorTurmaDisciplinaId: validaAcesso[0].id //
    });
  }

  async cadastrarAtividadeView(req, res) {
    const { turmaId, disciplinaId, atividadeId } = req.params;
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

    let atividades = new AtividadeModel();
    let atividadeInfo = await atividades.obterAtividadePor(atividadeId);

    res.render('seeds/professor/cadastrarAtividade.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      professorTurmaId: validaAcesso[0].id,
      atividadeInfo: atividadeInfo[0],
      turmaId,
      disciplinaId,
    });
  }

  async gravarAtividade(req, res) {
    const {
      atividade_id,
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
        atividade_id,
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

    let entrega = new EntregaModel();
    let listaAtividades = await entrega.listarEntregas(
      turmaProfessorId[0].id,
      atividadeId,
    );


    res.render('seeds/professor/corrigirAtividade.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      listaAtividades,
      atividadeId
    });
  }



  async quadroNotasView(req, res) {
    const { turmaId, disciplinaId } = req.params;
    const professorId = req.session.usuario.userId;

    // Verificar acesso
    let professores = new ProfessorModel();
    let validaAcesso = await professores.validaAcesso(professorId, turmaId, disciplinaId);

    if (!validaAcesso.length) {
      return res.send('<p>Usuário sem permissão</p>');
    }

    // inf da turma
    const turmaModel = new TurmaModel();
    const turmaLista = await turmaModel.filtrarPorId(turmaId);
    const turmaInfo = turmaLista.length > 0 ? turmaLista[0] : null;

    // inf disciplina
    const disciplinaModel = new DisciplinaModel();
    const disciplinaLista = await disciplinaModel.obter(disciplinaId);
    const disciplinaInfo = disciplinaLista.length > 0 ? disciplinaLista[0] : null;

    // buscar atividades
    const atividadesModel = new AtividadeModel();
    const listaAtividades = await atividadesModel.listarAtividades(validaAcesso[0].id);

    // buscar quadro_id
    const quadroNotasModel = new QuadroNotasModel();
    const quadro_id = await quadroNotasModel.buscarIdPorProfessorTurmaDisciplina(validaAcesso[0].id);

    // buscar itens do quadro de notas
    let itensQuadroModel = new ItensQuadroNotasModel();
    let itensQuadro = await itensQuadroModel.listarPorQuadro(quadro_id);

    // notas entregas
    const entregaModel = new EntregaModel();
    const notas = await entregaModel.listarEntregas(turmaId, disciplinaId);

    // Transforma a lista em um mapa para facilitar o acesso no EJS
    const listaComItens = listaAtividades.map(atividade => {
      const item = itensQuadro.find(i => i.atividade_id == atividade.atividade_id);
      return {
        atividade,
        item: item 
      };
    });

    res.render('seeds/professor/itensQuadro.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      turmaInfo,
      disciplinaInfo,
      notas,
      listaComItens,
      professorTurmaDisciplinaId: validaAcesso[0].id
    });

  }


  //GRAVAR ITENS QUADRO

async gravarItemQuadro(req, res) {
  const { professor_turma_disciplina_id, atividades } = req.body;

  const quadroNotasModel = new QuadroNotasModel();
  const quadro_id = await quadroNotasModel.buscarIdPorProfessorTurmaDisciplina(professor_turma_disciplina_id);

  if (!quadro_id) {
    return res.send({ ok: false, erro: 'Quadro de notas não encontrado.' });
  }

  //Verificação da soma dos pesos
  let somaPesos = 0;
  let contaFormatada = '';

  for (let i = 0; i < atividades.length; i++) {
    const pesoAtual = parseFloat(atividades[i].peso) || 0;
    somaPesos += pesoAtual;
    contaFormatada += pesoAtual;

    if (i < atividades.length - 1) {
      contaFormatada += ' + ';
    }
  }

  contaFormatada += ` = ${somaPesos}`;

  if (somaPesos != 10) {
    return res.send({
      ok: false,
      erro: `A soma dos pesos deve ser igual a 10. Verificação: ${contaFormatada}`
    });
  }

  try {
    for (let i = 0; i < atividades.length; i++) {
      const atividade = atividades[i];

      const item = new ItensQuadroNotasModel(
        atividade.id || null,
        quadro_id,
        atividade.atividade_id,
        atividade.descricao,
        atividade.peso,
        atividade.tipo
      );

      await item.gravarItem();
    }

    res.send({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ ok: false, erro: 'Erro ao salvar itens do quadro de notas.' });
  }
}




  //EDITAR ITENS 
  async editarItemQuadro(req, res) {
    const { id, peso, tipo } = req.body;

    const item = new ItensQuadroNotasModel();
    item.id = id;
    item.peso = peso;
    item.tipo = tipo;

    const sucesso = await item.gravarItem();
    res.send({ ok: sucesso });
  }

  async corrigeAtividade(req, res) {
    const {atividade_id, aluno_RA, nota} = req.body
    const professorId = req.session.usuario.userId;

    // Verificar acesso
    let atividadeData = new AtividadeModel();
    let validaAcesso = await atividadeData.obterAtividadePor(atividade_id)

    let NovaEntrega = new EntregaModel();
    let entregas = await NovaEntrega.obterEntrega(atividade_id, aluno_RA)

    if (!validaAcesso.length) {
      return res.send('<p>Usuário sem permissão</p>');
    }

    const dataHoraAtual = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const novaEntrega = new EntregaModel(
      entregas?.entrega_id || null,
      atividade_id,
      aluno_RA,
      validaAcesso[0].professor_turma_disciplina_id,
      dataHoraAtual,
      ' ',
      nota,
      '',
      '',
      '',
      'Corrigido'
    );
    
    const sucesso = await novaEntrega.gravaAtividade();
    res.send({ ok: sucesso });
  }
}

module.exports = ProfessorController;
