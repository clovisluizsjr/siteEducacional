const Database = require('../utils/database');

class QuadroNotasModel {
  #id;
  #professor_turma_disciplina_id;

  get id() { return this.#id }
  set id(value) { this.#id = value }

  get professor_turma_disciplina_id() { return this.#professor_turma_disciplina_id }
  set professor_turma_disciplina_id(value) { this.#professor_turma_disciplina_id = value }

  constructor(id = null, professor_turma_disciplina_id = null) {
    this.#id = id;
    this.#professor_turma_disciplina_id = professor_turma_disciplina_id;
  }

  async buscarIdPorProfessorTurmaDisciplina(professorTurmaDisciplinaId) {
    const banco = new Database();
    const sql = `SELECT id FROM QuadroNotas WHERE professor_turma_disciplina_id = ?`;
    const valores = [professorTurmaDisciplinaId];
    const rows = await banco.ExecutaComando(sql, valores);

    if (rows.length > 0) {
      this.#id = rows[0].id;
      return this.#id;
    }

    return null;
  }
}

module.exports = QuadroNotasModel;
