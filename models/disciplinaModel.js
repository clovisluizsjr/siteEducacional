const Database = require('../utils/database');

class DisciplinaModel{
  #disciplina_id;
  #disciplina_nome;
  #disciplina_horario;
  #disciplina_categoria;
  #professor_id;
  #serie_id;

  get disciplina_id() { return this.#disciplina_id } set disciplina_id(value) { this.#disciplina_id = value }
  get disciplina_nome() { return this.#disciplina_nome } set disciplina_nome(value) { this.#disciplina_nome = value }
  get disciplina_horario() { return this.#disciplina_horario } set disciplina_horario(value) { this.#disciplina_horario = value }
  get disciplina_categoria() { return this.#disciplina_categoria } set disciplina_categoria(value) { this.#disciplina_categoria = value }
  get professor_id() { return this.#professor_id } set professor_id(value) { this.#professor_id = value }
  get serie_id() { return this.#serie_id } set serie_id(value) { this.#serie_id = value }

  constructor(disciplina_id, disciplina_nome, disciplina_horario, disciplina_categoria, professor_id, serie_id){
    this.disciplina_id = disciplina_id;
    this.disciplina_nome = disciplina_nome;
    this.disciplina_horario = disciplina_horario;
    this.disciplina_categoria = disciplina_categoria;
    this.professor_id = professor_id;
    this.serie_id = serie_id;
  }

  async listarProfessorPor(id){
    let sql = "SELECT * FROM Disciplinas WHERE professor_id = ?";
    let valores = [id]
    let banco = new Database();
    let lista =[];
    let rows = await banco.ExecutaComando(sql, valores);

    for(let i= 0; i < rows.length; i++) {
      lista.push(new DisciplinaModel(rows[i]["disciplina_id"],
                                rows[i]["disciplina_nome"],
                                rows[i]["disciplina_horario"],
                                rows[i]["disciplina_categoria"],
                                rows[i]["professor_id"],
                                rows[i]["serie_id"],
      ));
    }
  
    return lista;
  }

  async obter(id){
    let sql = "SELECT * FROM Disciplinas WHERE disciplina_id = ?";
    let valores = [id]
    let banco = new Database();
    let lista =[];
    let rows = await banco.ExecutaComando(sql, valores);

    for(let i= 0; i < rows.length; i++) {
      lista.push(new DisciplinaModel(rows[i]["disciplina_id"],
                                rows[i]["disciplina_nome"],
                                rows[i]["disciplina_horario"],
                                rows[i]["disciplina_categoria"],
                                rows[i]["professor_id"],
                                rows[i]["serie_id"],
      ));
    }
  
    return lista;
  }

}

module.exports = DisciplinaModel;