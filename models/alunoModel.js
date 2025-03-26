const Database = require('../utils/database');

class AlunoModel {
  #aluno_RA;
  #aluno_nome;
  #aluno_CPF;
  #aluno_nasc;
  #aluno_fone;
  #aluno_email;
  #aluno_mae;
  #aluno_pai;
  #aluno_respCPF;
  #aluno_endereco;
  #aluno_senha;
  #aluno_statusFinanceiro;
  #serie_id;

  get aluno_RA() { return this.#aluno_RA} set aluno_RA(value) { this.#aluno_RA = value }
  get aluno_nome() { return this.#aluno_nome } set aluno_nome(value) { this.#aluno_nome = value }
  get aluno_CPF() { return this.#aluno_CPF } set aluno_CPF(value) { this.#aluno_CPF = value }
  get aluno_nasc() { return this.#aluno_nasc } set aluno_nasc(value) { this.#aluno_nasc = value }
  get aluno_fone() { return this.#aluno_fone } set aluno_fone(value) { this.#aluno_fone = value }
  get aluno_email() { return this.#aluno_email } set aluno_email(value) { this.#aluno_email = value }
  get aluno_mae() { return this.#aluno_mae } set aluno_mae(value) { this.#aluno_mae = value }
  get aluno_pai() { return this.#aluno_pai } set aluno_pai(value) { this.#aluno_pai = value }
  get aluno_respCPF() { return this.#aluno_respCPF } set aluno_respCPF(value) { this.#aluno_respCPF = value }
  get aluno_endereco() { return this.#aluno_endereco } set aluno_endereco(value) { this.#aluno_endereco = value }
  get aluno_senha() { return this.#aluno_senha } set aluno_senha(value) { this.#aluno_senha = value }
  get aluno_statusFinanceiro() { return this.#aluno_statusFinanceiro } set aluno_statusFinanceiro(value) { this.#aluno_statusFinanceiro = value }
  get serie_id() { return this.#serie_id } set serie_id(value) { this.#serie_id = value }

  constructor(aluno_RA, aluno_nome, aluno_CPF, aluno_nasc, aluno_fone, aluno_email, aluno_mae, aluno_pai, aluno_respCPF, aluno_endereco, aluno_senha,aluno_statusFinanceiro, serie_id) {
    this.aluno_RA = aluno_RA;
    this.aluno_nome = aluno_nome;
    this.aluno_CPF = aluno_CPF;
    this.aluno_nasc = aluno_nasc;
    this.aluno_fone = aluno_fone;
    this.aluno_email = aluno_email;
    this.aluno_mae = aluno_mae;
    this.aluno_pai = aluno_pai;
    this.aluno_respCPF = aluno_respCPF;
    this.aluno_endereco = aluno_endereco;
    this.aluno_senha = aluno_senha;
    this.aluno_statusFinanceiro = aluno_statusFinanceiro;
    this.serie_id = serie_id;
  }

  async listar() {
    let sql = 'SELECT * FROM Alunos ';
    let banco = new Database();
    let lista = [];
    let rows = await banco.ExecutaComando(sql);
    for (let i = 0; i < rows.length; i++) {
      lista.push(new AlunoModel(rows[i]["aluno_RA"],
                                rows[i]["aluno_nome"],
                                rows[i]["aluno_CPF"],
                                rows[i]["aluno_nasc"],
                                rows[i]["aluno_fone"],
                                rows[i]["aluno_email"],
                                rows[i]["aluno_mae"],
                                rows[i]["aluno_pai"],
                                rows[i]["aluno_respCPF"],
                                rows[i]["aluno_endereco"],
                                rows[i]["aluno_senha"],
                                rows[i]["aluno_statusFinanceiro"],
                                rows[i]["serie_id"],
      ))
    }
    return lista;
  }

  async validar(email, senha) { //    -- devolve o email do aluno logado
    let sql = `select * FROM Alunos WHERE aluno_email = ? AND aluno_senha = ?`;
    let valores = [email, senha];
    let banco = new Database();

    let rows = await banco.ExecutaComando(sql, valores);

    if(rows.length > 0) {
      return rows[0]["aluno_email"];     
    }
    return null;
  }

  async obterPor(email) {
    let sql = `select * FROM Alunos WHERE aluno_email = ?`
    let valores = [email]
    let banco = new Database();
    let rows = await banco.ExecutaComando(sql, valores);
    let lista = [];
    for (let i = 0; i < rows.length; i++) {
      lista.push(new AlunoModel(rows[i]["aluno_RA"],
                                rows[i]["aluno_nome"],
                                rows[i]["aluno_CPF"],
                                rows[i]["aluno_nasc"],
                                rows[i]["aluno_fone"],
                                rows[i]["aluno_email"],
                                rows[i]["aluno_mae"],
                                rows[i]["aluno_pai"],
                                rows[i]["aluno_respCPF"],
                                rows[i]["aluno_endereco"],
                                rows[i]["aluno_senha"],
                                rows[i]["aluno_statusFinanceiro"],
                                rows[i]["serie_id"],
      ))
    }
    return lista;

  }

}

module.exports = AlunoModel;
