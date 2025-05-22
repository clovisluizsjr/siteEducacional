const Database = require('../utils/database');

class ProfessorModel {
  #professor_id;
  #professor_nome;
  #professor_CPF;
  #professor_nasc;
  #professor_fone;
  #professor_email;
  #professor_endereco;
  #professor_senha;

  get professor_id(){ return this.#professor_id } set professor_id(value) { this.#professor_id = value }
  get professor_nome(){ return this.#professor_nome } set professor_nome(value) { this.#professor_nome = value }
  get professor_CPF(){ return this.#professor_CPF } set professor_CPF(value) { this.#professor_CPF = value }
  get professor_nasc(){ return this.#professor_nasc } set professor_nasc(value) { this.#professor_nasc = value }
  get professor_fone(){ return this.#professor_fone } set professor_fone(value) { this.#professor_fone = value }
  get professor_email(){ return this.#professor_email } set professor_email(value) { this.#professor_email = value }
  get professor_endereco(){ return this.#professor_endereco } set professor_endereco(value) { this.#professor_endereco = value }
  get professor_senha(){ return this.#professor_senha } set professor_senha(value) { this.#professor_senha = value }

  constructor(professor_id, professor_nome, professor_CPF, professor_nasc, professor_fone, professor_email, professor_endereco, professor_senha) {
    this.professor_id = professor_id;
    this.professor_nome = professor_nome;
    this.professor_CPF = professor_CPF;
    this.professor_nasc = professor_nasc;
    this.professor_fone = professor_fone;
    this.professor_email = professor_email;
    this.professor_endereco = professor_endereco;
    this.professor_senha = professor_senha;
  }

  async listar() {
    let sql = 'SELECT * FROM Professores';
    let banco = new Database();
    let lista = [];
    let rows = await banco.ExecutaComando(sql);
    for(let i= 0; i < rows.length; i++) {
      lista.push(new ProfessorModel(rows[i]["professor_id"],
                                rows[i]["professor_nome"],
                                rows[i]["professor_CPF"],
                                rows[i]["professor_nasc"],
                                rows[i]["professor_fone"],
                                rows[i]["professor_email"],
                                rows[i]["professor_endereco"],
                                rows[i]["professor_senha"],
      ));
    }
    return lista;
  }

  async obter(id) {
    let sql = 'SELECT * FROM Professores WHERE professor_id = ?';
    let valores = [id];
    let banco = new Database();
    let lista = [];
    let rows = await banco.ExecutaComando(sql, valores);
    for(let i= 0; i < rows.length; i++) {
      lista.push(new ProfessorModel(rows[i]["professor_id"],
                                rows[i]["professor_nome"],
                                rows[i]["professor_CPF"],
                                rows[i]["professor_nasc"],
                                rows[i]["professor_fone"],
                                rows[i]["professor_email"],
                                rows[i]["professor_endereco"],
                                rows[i]["professor_senha"],
      ));
    }
    return lista;
  }

  async validar(email, senha) { //    -- devolve o email do professor logado
    let sql = `select * FROM Professores 
              WHERE professor_email= ? AND professor_senha = ?`;
    let valores = [email, senha];
    let banco = new Database();

    let rows = await banco.ExecutaComando(sql, valores);

    if(rows.length > 0) {
      let row = rows[0];
      return new ProfessorModel(row["professor_id"],
                            row["professor_nome"],
                            row["professor_CPF"],
                            row["professor_nasc"],
                            row["professor_fone"],
                            row["professor_email"],
                            row["professor_endereco"],
                            row["professor_senha"],                       
      )    
    }
    return null;
  }

  async obterPor(email) {
    let sql = `select * FROM Professores WHERE professor_email = ?`
    let valores = [email]
    let banco = new Database();
    let rows = await banco.ExecutaComando(sql, valores);
    let lista = [];
    for(let i= 0; i < rows.length; i++) {
      lista.push(new ProfessorModel(rows[i]["professor_id"],
                                rows[i]["professor_nome"],
                                rows[i]["professor_CPF"],
                                rows[i]["professor_nasc"],
                                rows[i]["professor_fone"],
                                rows[i]["professor_email"],
                                rows[i]["professor_endereco"],
                                rows[i]["professor_senha"],
      ));
    }
    return lista;

  }

  async validaAcesso(professor_id, turma_id, disciplina_id) {
    let sql = `
    SELECT id FROM Professor_turmas_disciplinas
      WHERE professor_id = ? AND turma_id = ? AND disciplina_id = ?
    `
    let valores = [professor_id, turma_id, disciplina_id];
    let banco = new Database();
    let rows = await banco.ExecutaComando(sql, valores);
    let lista = [];
    for (let i = 0; i < rows.length; i++) {
      lista.push(rows[i]);
    }

    return lista;
  }

}

module.exports = ProfessorModel;
