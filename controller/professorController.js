const AlunoModel = require('../models/alunoModel');
const AtividadeProfessorModel = require('../models/atividadeProfessorModel');
const DisciplinaModel = require('../models/disciplinaModel');
const ProfessorModel = require('../models/professorModel');
const SerieModel = require('../models/serieModel');

class ProfessorController {
  home(req, res) {
    res.render('seeds/main.ejs', { layout: './layouts/layoutSeeds.ejs' });
  }

  async listarAlunos(req, res) {
    let alunos = new AlunoModel();
    let listaAlunos = await alunos.listar();
    let series = new SerieModel();
    let listaSeries = await series.listar();
    res.render('seeds/alunos.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      listaAlunos: listaAlunos,
      listaSeries: listaSeries,
    });
  }

  async listarSeries(req, res) {
    let professorId = req.session.usuario.userId;
    let disciplinas = new DisciplinaModel();
    let listaDisciplinas = await disciplinas.listarProfessorPor(professorId); // será renderizado disciplinas apenas deste professor
    let series = new SerieModel();
    let listaSeries = await series.listar();
    res.render('seeds/series.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      listaDisciplinas: listaDisciplinas,
      listaSeries: listaSeries,
    });
  }

  async discipinaInfo(req, res) {
    // renderiza info das disciplinas + atividades já existentes
    const { disciplinaId, serieId } = req.params;

    let disciplinas = new DisciplinaModel();
    let listaDisciplinas = await disciplinas.obter(disciplinaId);
    let series = new SerieModel();
    let listaSeries = await series.listar();
    let atividades = new AtividadeProfessorModel();
    let listaAtividades = await atividades.listarAtividadesPor(
      disciplinaId,
      serieId
    );
    res.render('seeds/disciplina.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      listaDisciplinas,
      listaSeries,
      listaAtividades,
    });
  }

  async cadastrarAtividadeView(req, res) {
    const { disciplinaId, serieId } = req.params;
    let disciplinas = new DisciplinaModel();
    let listaDisciplinas = await disciplinas.obter(disciplinaId);
    let series = new SerieModel();
    let listaSeries = await series.listar();

    res.render('seeds/cadastrarAtividade.ejs', {
      layout: './layouts/layoutSeeds.ejs',
      listaDisciplinas,
      listaSeries,
    });
  }

  // No ProfessorController
  async cadastrarAtividade(req, res) {
    const {
      atividadeProf_idProf,
      atividadeProf_tituloProf,
      atividadeProf_descricaoProf,
      atividadeProf_notaProf,
      atividadeProf_prazoProf,
      serie_id,
      disciplina_id,
    } = req.body;

    if (
      atividadeProf_tituloProf != '' &&
      atividadeProf_descricaoProf != '' &&
      atividadeProf_notaProf != '' &&
      atividadeProf_prazoProf != '' &&
      serie_id != '' &&
      disciplina_id != ''
    ) {
      let usuario = new AtividadeProfessorModel();
      usuario.atividadeProf_tituloProf = atividadeProf_tituloProf;
      usuario.atividadeProf_descricaoProf = atividadeProf_descricaoProf;
      usuario.atividadeProf_notaProf = atividadeProf_notaProf;
      usuario.atividadeProf_prazoProf = atividadeProf_prazoProf;
      usuario.serie_id = serie_id;
      usuario.disciplina_id = disciplina_id;

      let ok;
      let msg;

      // Se tem ID, é atualização
      if (atividadeProf_idProf) {
        usuario.atividadeProf_idProf = atividadeProf_idProf;
        ok = await usuario.atualizar();
        msg = "Atividade atualizada com sucesso!";
      } else {
        // Se não tem ID, é criação
        ok = await usuario.gravar();
        msg = "Atividade cadastrada com sucesso!";
      }

      if (ok) {
        res.send({ ok: true, msg: msg });
      } else {
        res.send({ ok: false, msg: "Erro ao processar a atividade no banco de dados!" });
      }
    } else {
      res.send({ ok: false, msg: "Informações incorretas" });
    }
  }

  async alterarView(req, res) {
    const id = req.params.id;
    const usuario = new AtividadeProfessorModel();
    let disciplinas = new DisciplinaModel();
    let series = new SerieModel();
    const usuarioAlteracao = await usuario.obter(id);
    let listaDisciplinas = await disciplinas.obter(id);
    let listaSeries = await series.listar();

    res.render('seeds/cadastrarAtividade.ejs', {
      usuarioAlteracao: usuarioAlteracao[0],
      listaDisciplinas, listaSeries
    });
  }


  //EXCLUIR

  async excluir(req, res) {
    //parametro id da url
    const id = req.params.id;
    const usuario = new AtividadeProfessorModel();
    const resultado = await usuario.excluir(id);
    let msg = "";
    if (resultado) {
      msg = "Usuário excluído com sucesso!"
    }
    else {
      msg = "Não foi possível excluir o usuário!";
    }
    res.json({
      ok: resultado,
      msg: msg
    });

  }
}

module.exports = ProfessorController;
