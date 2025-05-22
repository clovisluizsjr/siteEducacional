const AlunoModel = require('../models/alunoModel');
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

  // async listarAlunos(req, res) {
  //   let alunos = new AlunoModel();
  //   let listaAlunos = await alunos.listar();
  //   let series = new SerieModel();
  //   let listaSeries = await series.listar();
  //   res.render('seeds/alunos.ejs', {
  //     layout: './layouts/layoutSeeds.ejs',
  //     listaAlunos: listaAlunos,
  //     listaSeries: listaSeries,
  //   });
  // }

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
      return res
        .status(403)
        .render('error', { message: 'Acesso não autorizado' });
    }

    let turmas = new TurmaModel();
    let turmaInfo = await turmas.filtrarPorId(turmaId);
    let disciplinas = new DisciplinaModel();
    let disciplinaInfo = await disciplinas.obter(disciplinaId);


    // let atividades = new AtividadeProfessorModel();
    // let listaAtividades = await atividades.listarAtividadesPor(
    //   disciplinaId,
    //   serieId
    // );
    res.render('seeds/disciplina.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      turmaInfo: turmaInfo[0],
      disciplinaInfo: disciplinaInfo[0],
      // listaAtividades,
    });
  }

  // async cadastrarAtividadeView(req, res) {
  //   const { disciplinaId, serieId } = req.params;
  //   let disciplinas = new DisciplinaModel();
  //   let listaDisciplinas = await disciplinas.obter(disciplinaId);
  //   let series = new SerieModel();
  //   let listaSeries = await series.listar();

  //   res.render('seeds/cadastrarAtividade.ejs', {
  //     layout: './layouts/layoutSeeds.ejs',
  //     listaDisciplinas,
  //     listaSeries,
  //   });
  // }

  // // No ProfessorController
  // async cadastrarAtividade(req, res) {
  //   const {
  //     atividadeProf_idProf,
  //     atividadeProf_tituloProf,
  //     atividadeProf_descricaoProf,
  //     atividadeProf_notaProf,
  //     atividadeProf_prazoProf,
  //     serie_id,
  //     disciplina_id,
  //   } = req.body;

  //   if (
  //     atividadeProf_tituloProf != '' &&
  //     atividadeProf_descricaoProf != '' &&
  //     atividadeProf_notaProf != '' &&
  //     atividadeProf_prazoProf != '' &&
  //     serie_id != '' &&
  //     disciplina_id != ''
  //   ) {
  //     let usuario = new AtividadeProfessorModel();
  //     usuario.atividadeProf_tituloProf = atividadeProf_tituloProf;
  //     usuario.atividadeProf_descricaoProf = atividadeProf_descricaoProf;
  //     usuario.atividadeProf_notaProf = atividadeProf_notaProf;
  //     usuario.atividadeProf_prazoProf = atividadeProf_prazoProf;
  //     usuario.serie_id = serie_id;
  //     usuario.disciplina_id = disciplina_id;

  //     let ok;
  //     let msg;

  //     // Se tem ID, é atualização
  //     if (atividadeProf_idProf) {
  //       usuario.atividadeProf_idProf = atividadeProf_idProf;
  //       ok = await usuario.atualizar();
  //       msg = "Atividade atualizada com sucesso!";
  //     } else {
  //       // Se não tem ID, é criação
  //       ok = await usuario.gravar();
  //       msg = "Atividade cadastrada com sucesso!";
  //     }

  //     if (ok) {
  //       res.send({ ok: true, msg: msg });
  //     } else {
  //       res.send({ ok: false, msg: "Erro ao processar a atividade no banco de dados!" });
  //     }
  //   } else {
  //     res.send({ ok: false, msg: "Informações incorretas" });
  //   }
  // }

  // async alterarView(req, res) {
  //   const id = req.params.id;
  //   const usuario = new AtividadeProfessorModel();
  //   let disciplinas = new DisciplinaModel();
  //   let series = new SerieModel();

  //   const usuarioAlteracao = await usuario.obter(id);
  //   const listaDisciplinas = await disciplinas.listarProfessorPor(req.session.usuario.userId);
  //   const listaSeries = await series.listar();

  //   res.render('seeds/cadastrarAtividade.ejs', {
  //     usuarioAlteracao: usuarioAlteracao[0],
  //     listaDisciplinas,
  //     listaSeries
  //   });
  // }

  // //EXCLUIR

  // async excluir(req, res) {
  //   //parametro id da url
  //   const id = req.params.id;
  //   const usuario = new AtividadeProfessorModel();
  //   const resultado = await usuario.excluir(id);
  //   let msg = "";
  //   if (resultado) {
  //     msg = "Usuário excluído com sucesso!"
  //   }
  //   else {
  //     msg = "Não foi possível excluir o usuário!";
  //   }
  //   res.json({
  //     ok: resultado,
  //     msg: msg
  //   });

  // }
}

module.exports = ProfessorController;
