const Database = require('../utils/database');

class TurmaModel{
  #turma_id;
  #turma_nome;
  #turma_quantidade;
  #serie_id;

  get turma_id() { return this.#turma_id } set turma_id(value) { this.#turma_id = value }
  get turma_nome() { return this.#turma_nome } set turma_nome(value) { this.#turma_nome = value }
  get turma_quantidade() { return this.#turma_quantidade } set turma_quantidade(value) { this.#turma_quantidade = value }
  get serie_id() { return this.#serie_id } set serie_id(value) { this.#serie_id = value }

  constructor(turma_id, turma_nome, turma_quantidade, serie_id){
    this.turma_id = turma_id;
    this.turma_nome = turma_nome;
    this.turma_quantidade = turma_quantidade;
    this.serie_id = serie_id;
  }

  async listar(){
    let sql = 'SELECT * FROM Turmas';
    let banco = new Database();
    let lista =[];
    let rows = await banco.ExecutaComando(sql);
    for(let i= 0; i < rows.length; i++) {
      lista.push(new TurmaModel(rows[i]["turma_id"],
                                rows[i]["turma_nome"],
                                rows[i]["turma_quantidade"],
                                rows[i]["serie_id"],
      ));
    }
    return lista;
  }
}

module.exports = TurmaModel;