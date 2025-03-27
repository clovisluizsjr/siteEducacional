const Database = require('../utils/database');

class AtividadeProfessorModel {
  #atividadeProf_idProf;
  #atividadeProf_tituloProf;
  #atividadeProf_descricaoProf;
  #atividadeProf_notaProf;
  #atividadeProf_prazoProf;
  #disciplina_id;
  #serie_id;

  get atividadeProf_idProf() { return this.#atividadeProf_idProf } set atividadeProf_idProf(value) { this.#atividadeProf_idProf = value }

  get atividadeProf_tituloProf() { return this.#atividadeProf_tituloProf } set atividadeProf_tituloProf(value) { this.#atividadeProf_tituloProf = value }

  get atividadeProf_descricaoProf() { return this.#atividadeProf_descricaoProf } set atividadeProf_descricaoProf(value) { this.#atividadeProf_descricaoProf = value }

  get atividadeProf_notaProf() { return this.#atividadeProf_notaProf } set atividadeProf_notaProf(value) { this.#atividadeProf_notaProf = value }

  get atividadeProf_prazoProf() { return this.#atividadeProf_prazoProf } set atividadeProf_prazoProf(value) { this.#atividadeProf_prazoProf = value }

  get disciplina_id() { return this.#disciplina_id } set disciplina_id(value) { this.#disciplina_id = value }

  get serie_id() { return this.#serie_id } set serie_id(value) { this.#serie_id = value }

  constructor(atividadeProf_idProf, atividadeProf_tituloProf, atividadeProf_descricaoProf, atividadeProf_notaProf, atividadeProf_prazoProf, disciplina_id, serie_id) {
    this.atividadeProf_idProf = atividadeProf_idProf;
    this.atividadeProf_tituloProf = atividadeProf_tituloProf;
    this.atividadeProf_descricaoProf = atividadeProf_descricaoProf;
    this.atividadeProf_notaProf = atividadeProf_notaProf;
    this.atividadeProf_prazoProf = atividadeProf_prazoProf;
    this.disciplina_id = disciplina_id;
    this.serie_id = serie_id;
  }

  async listarAtividadesPor(disciplinaId, serieId){
    let sql = "SELECT * FROM AtividadeProfessor WHERE disciplina_id = ? AND serie_id = ?"; 
    let valores = [disciplinaId, serieId];
    let banco = new Database();
    let lista =[];
    let rows = await banco.ExecutaComando(sql, valores);
    for(let i= 0; i < rows.length; i++) {
      lista.push(new AtividadeProfessorModel(rows[i]["atividadeProf_idProf"],
                                rows[i]["atividadeProf_tituloProf"],
                                rows[i]["atividadeProf_descricaoProf"],
                                rows[i]["atividadeProf_notaProf"],
                                rows[i]["atividadeProf_prazoProf"],
                                rows[i]["disciplina_id"],
                                rows[i]["serie_id"],
      ));
    }
  
    return lista;
  }

  async gravar() {
    let sql = `insert into AtividadeProfessor 
                    (atividadeProf_tituloProf, atividadeProf_descricaoProf, atividadeProf_notaProf, atividadeProf_prazoProf, disciplina_id, serie_id)
               values 
                    (?, ?, ?, ?, ?, ?)`;
    let valores = [this.#atividadeProf_tituloProf, this.#atividadeProf_descricaoProf, this.#atividadeProf_notaProf, this.#atividadeProf_prazoProf, this.#disciplina_id, this.#serie_id]
    let banco = new Database();
    let resultado = await banco.ExecutaComandoNonQuery(sql, valores);

    return resultado;
}

}

module.exports = AtividadeProfessorModel;