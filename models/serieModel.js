const Database = require('../utils/database');

class SerieModel{
  #serie_id;
  #serie_nome;
  #serie_quantMAX;
  #serie_quantidadeALU;

  get serie_id() { return this.#serie_id } set serie_id(value) { this.#serie_id = value }
  get serie_nome() { return this.#serie_nome } set serie_nome(value) { this.#serie_nome = value }
  get serie_quantMAX() { return this.#serie_quantMAX } set serie_quantMAX(value) { this.#serie_quantMAX = value }
  get serie_quantidadeALU() { return this.#serie_quantidadeALU } set serie_quantidadeALU(value) { this.#serie_quantidadeALU = value }

  constructor(serie_id, serie_nome, serie_quantMAX, serie_quantidadeAluno){
    this.serie_id = serie_id;
    this.serie_nome = serie_nome;
    this.serie_quantMAX = serie_quantMAX;
    this.serie_quantidadeALU = serie_quantidadeALU;
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
                                rows[i]["serie_quantMAX"],
                                rows[i]["serie_quantidadeALU"],
      ));
    }
    return lista;
  }
}

module.exports = SerieModel;