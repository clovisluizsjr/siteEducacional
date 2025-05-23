const Database = require('../utils/database');

class TurmaModel {
  #turma_id;
  #turma_nome;
  #turma_quantALU;
  #turma_quantMAX;

  get turma_id() {
    return this.#turma_id;
  }
  set turma_id(value) {
    this.#turma_id = value;
  }
  get turma_nome() {
    return this.#turma_nome;
  }
  set turma_nome(value) {
    this.#turma_nome = value;
  }
  get turma_quantALU() {
    return this.#turma_quantALU;
  }
  set turma_quantALU(value) {
    this.#turma_quantALU = value;
  }
  get turma_quantMAX() {
    return this.#turma_quantMAX;
  }
  set turma_quantMAX(value) {
    this.#turma_quantMAX = value;
  }

  constructor(turma_id, turma_nome, turma_quantALU, turma_quantMAX) {
    this.turma_id = turma_id;
    this.turma_nome = turma_nome;
    this.turma_quantALU = turma_quantALU;
    this.turma_quantMAX = turma_quantMAX;
  }

  async listar() {
    let sql = 'SELECT * FROM Turmas';
    let banco = new Database();
    let lista = [];
    let rows = await banco.ExecutaComando(sql);
    for (let i = 0; i < rows.length; i++) {
      lista.push(
        new TurmaModel(
          rows[i]['turma_id'],
          rows[i]['turma_nome'],
          rows[i]['turma_quantALU'],
          rows[i]['turma_quantMAX']
        )
      );
    }
    return lista;
  }

  async filtrarPorId(id) {
    let sql = 'SELECT * FROM Turmas WHERE turma_id = ?';
    let valor = [id];
    let banco = new Database();
    let lista = [];
    let rows = await banco.ExecutaComando(sql, valor);
    for (let i = 0; i < rows.length; i++) {
      lista.push(
        new TurmaModel(
          rows[i]['turma_id'],
          rows[i]['turma_nome'],
          rows[i]['turma_quantALU'],
          rows[i]['turma_quantMAX']
        )
      );
    }

    return lista;
  }
}

module.exports = TurmaModel;
