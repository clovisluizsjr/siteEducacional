const Database = require('../utils/database');

class SerieModel{
  #serie_id;
  #serie_nome;
  #serie_quantidade;
  #serie_quantidadeAluno;

  get serie_id() { return this.#serie_id } set serie_id(value) { this.#serie_id = value }
  get serie_nome() { return this.#serie_nome } set serie_nome(value) { this.#serie_nome = value }
  get serie_quantidade() { return this.#serie_quantidade } set serie_quantidade(value) { this.#serie_quantidade = value }
  get serie_quantidadeAluno() { return this.#serie_quantidadeAluno } set serie_quantidadeAluno(value) { this.#serie_quantidadeAluno = value }

  constructor(serie_id, serie_nome, serie_quantidade, serie_quantidadeAluno){
    this.serie_id = serie_id;
    this.serie_nome = serie_nome;
    this.serie_quantidade = serie_quantidade;
    this.serie_quantidadeAluno = serie_quantidadeAluno;
  }

  async listar(){
    let sql = 'SELECT * FROM Series';
    let banco = new Database();
    let lista =[];
    let rows = await banco.ExecutaComando(sql);
    for(let i= 0; i < rows.length; i++) {
      lista.push(new SerieModel(rows[i]["serie_id"],
                                rows[i]["serie_nome"],
                                rows[i]["serie_quantidade"],
                                rows[i]["serie_quantidadeAluno"],
      ));
    }
    return lista;
  }
}

module.exports = SerieModel;