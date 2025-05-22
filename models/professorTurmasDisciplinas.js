const Database = require('../utils/database');

class ProfessorTurmasDisciplinas {
  #id;
  #professor_id;
  #turma_id;
  #disciplina_id;

  get id() {
    return this.#id;
  }
  set id(value) {
    this.#id = value;
  }
  get professor_id() {
    return this.#professor_id;
  }
  set professor_id(value) {
    this.#professor_id = value;
  }
  get turma_id() {
    return this.#turma_id;
  }
  set turma_id(value) {
    this.#turma_id = value;
  }
  get disciplina_id() {
    return this.#disciplina_id;
  }
  set disciplina_id(value) {
    this.#disciplina_id = value;
  }

  constructor(id, professor_id, turma_id, disciplina_id) {
    this.id = id;
    this.professor_id = professor_id;
    this.turma_id = turma_id;
    this.disciplina_id = disciplina_id;
  }

  async listarPorProfessorId(id) {
    let sql = `
      SELECT t.turma_id, t.turma_nome, d.disciplina_id, d.disciplina_nome
      FROM Professor_turmas_disciplinas ptd
      JOIN Turmas t ON ptd.turma_id = t.turma_id
      JOIN Disciplinas d ON ptd.disciplina_id = d.disciplina_id
      WHERE  ptd.professor_id = ?
    `;
    let valor = [id];
    let banco = new Database();
    let rows = await banco.ExecutaComando(sql, valor);
    let lista = [];
    for (let i = 0; i < rows.length; i++) {
      lista.push(rows[i]);
    }

    return lista;
  }
}

module.exports = ProfessorTurmasDisciplinas;
