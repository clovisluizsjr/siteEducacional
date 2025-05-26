const Database = require('../utils/database');

class AtividadeModel {
  #atividade_id;
  #titulo;
  #descricao;
  #data_inicial;
  #data_limite;
  #professor_turma_disciplina_id;

  get atividade_id() { return this.#atividade_id }
  set atividade_id(value) { this.#atividade_id = value }
  get titulo(){ return this.#titulo }
  set titulo(value){ this.#titulo = value }
  get descricao(){ return this.#descricao }
  set descricao(value) { this.#descricao = value }
  get data_inicial() { return this.#data_inicial }
  set data_inicial(value) {this.#data_inicial = value }
  get data_limite() { return this.#data_limite }
  set data_limite(value) { this.#data_limite = value }
  get professor_turma_disciplina_id() { return this.#professor_turma_disciplina_id }
  set professor_turma_disciplina_id(value) {this.#professor_turma_disciplina_id = value }

  constructor(atividade_id, titulo, descricao, data_inicial, data_limite, professor_turma_disciplina_id) {
    this.#atividade_id = atividade_id;
    this.#titulo = titulo;
    this.#descricao = descricao;
    this.#data_inicial = data_inicial;
    this.#data_limite = data_limite;
    this.#professor_turma_disciplina_id = professor_turma_disciplina_id;
  }

  async listarAtividades(id) {
    let sql = 'SELECT * FROM Atividades WHERE professor_turma_disciplina_id = ?'
    let valor = [id];
    let banco = new Database();
    let lista = [];
    let rows = await banco.ExecutaComando(sql, valor);

    for (let i = 0; i < rows.length; i++) {
      lista.push(new AtividadeModel(
        rows[i]['atividade_id'],
        rows[i]['titulo'],
        rows[i]['descricao'],
        rows[i]['data_inicial'],
        rows[i]['data_limite'],
        rows[i]['professor_turma_disciplina_id'],
      ))
    }
    return lista;
  }

  async gravarAtividade() {
    let banco = new Database();
    if (this.#atividade_id == 0) {
      let sql = `
      INSERT INTO Atividades (titulo, descricao, data_inicial, data_limite, professor_turma_disciplina_id)
      VALUES (?, ?, ?, ?, ?)
      `;
      let valores = [
        this.#titulo,
        this.#descricao,
        this.#data_inicial,
        this.#data_limite,
        this.#professor_turma_disciplina_id,
      ];
      let resultado = await banco.ExecutaComando(sql, valores);
      return resultado;
    } else {
      //alteraAtividade
      let sql = `UPDATE Atividades 
      SET titulo = ?, descricao = ?, data_inicial = ?, data_limite = ?
      WHERE  atividade_id = ?,
      `;
      let valores = [
        this.#atividade_id,
        this.#titulo,
        this.#descricao,
        this.#data_inicial,
        this.#data_limite,
        this.#atividade_id
      ];
      
      let resultado = await banco.ExecutaComando(sql, valores);
      return resultado;
    }
  }

  async excluirAtividade(id){
    let sql = `DELETE FROM Atividades
    WHERE atividade_id = ?
    `
    let valores = [id];
    let banco = new Database();
    let resultado = await banco.ExecutaComando(sql, valores)
    return resultado;
  }
}

module.exports = AtividadeModel;
