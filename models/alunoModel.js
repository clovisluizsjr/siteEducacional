const Database = require('../utils/database');

class AlunoModel {
  #aluno_RA;
  #aluno_nome;
  #aluno_CPF;
  #aluno_nasc;
  #aluno_fone;
  #aluno_email;
  #aluno_responsavel;
  #aluno_respCPF;
  #aluno_endereco;
  #aluno_senha;

  get aluno_RA() {
    return this.#aluno_RA;
  }
  set aluno_RA(value) {
    this.#aluno_RA = value;
  }
  get aluno_nome() {
    return this.#aluno_nome;
  }
  set aluno_nome(value) {
    this.#aluno_nome = value;
  }
  get aluno_CPF() {
    return this.#aluno_CPF;
  }
  set aluno_CPF(value) {
    this.#aluno_CPF = value;
  }
  get aluno_nasc() {
    return this.#aluno_nasc;
  }
  set aluno_nasc(value) {
    this.#aluno_nasc = value;
  }
  get aluno_fone() {
    return this.#aluno_fone;
  }
  set aluno_fone(value) {
    this.#aluno_fone = value;
  }
  get aluno_email() {
    return this.#aluno_email;
  }
  set aluno_email(value) {
    this.#aluno_email = value;
  }
  get aluno_responsavel() {
    return this.#aluno_responsavel;
  }
  set aluno_responsavel(value) {
    this.#aluno_responsavel = value;
  }
  get aluno_respCPF() {
    return this.#aluno_respCPF;
  }
  set aluno_respCPF(value) {
    this.#aluno_respCPF = value;
  }
  get aluno_endereco() {
    return this.#aluno_endereco;
  }
  set aluno_endereco(value) {
    this.#aluno_endereco = value;
  }
  get aluno_senha() {
    return this.#aluno_senha;
  }
  set aluno_senha(value) {
    this.#aluno_senha = value;
  }

  constructor(
    aluno_RA,
    aluno_nome,
    aluno_CPF,
    aluno_nasc,
    aluno_fone,
    aluno_email,
    aluno_responsavel,
    aluno_respCPF,
    aluno_endereco,
    aluno_senha
  ) {
    this.aluno_RA = aluno_RA;
    this.aluno_nome = aluno_nome;
    this.aluno_CPF = aluno_CPF;
    this.aluno_nasc = aluno_nasc;
    this.aluno_fone = aluno_fone;
    this.aluno_email = aluno_email;
    this.aluno_responsavel = aluno_responsavel;
    this.aluno_respCPF = aluno_respCPF;
    this.aluno_endereco = aluno_endereco;
    this.aluno_senha = aluno_senha;
  }

  async listarAlunos(atividadeId, turmaProfessorId) {
    let sql = `
      SELECT a.aluno_RA, a.aluno_nome, e.conteudo, e.nota, e.data_entrega,
      CASE 
      WHEN e.conteudo IS NULL THEN 'Não entregue'
      WHEN e.nota IS NULL THEN 'Pendente'
      ELSE 'corrigido'
      END AS status_entrega
      FROM Professor_turmas_disciplinas ptd
      JOIN Aluno_turmas at ON ptd.turma_id = at.turma_id
      JOIN Alunos a ON at.aluno_RA = a.aluno_RA
      LEFT JOIN Entregas e ON a.aluno_RA = e.aluno_RA AND e.atividade_id = ?
      WHERE ptd.id = ? ORDER BY a.aluno_nome ASC 
   `;

    let valores = [atividadeId, turmaProfessorId];
    let banco = new Database();
    let rows = await banco.ExecutaComando(sql, valores);
    let lista = [];

    for (let i = 0; i < rows.length; i++) {
      lista.push(rows[i]);
    }
    return lista;
  }

  async validar(email, senha) {
    //    -- devolve o email do aluno logado
    let sql = `select * FROM Alunos WHERE aluno_email = ? AND aluno_senha = ?`;
    let valores = [email, senha];
    let banco = new Database();

    let rows = await banco.ExecutaComando(sql, valores);

    if (rows.length > 0) {
      let row = rows[0];
      return new AlunoModel(
        row['aluno_RA'],
        row['aluno_nome'],
        row['aluno_CPF'],
        row['aluno_nasc'],
        row['aluno_fone'],
        row['aluno_email'],
        row['aluno_responsavel'],
        row['aluno_respCPF'],
        row['aluno_endereco'],
        row['aluno_senha']
      );
    }
    return null;
  }

  async obterPor(email) {
    let sql = `select * FROM Alunos WHERE aluno_email = ?`;
    let valores = [email];
    let banco = new Database();
    let rows = await banco.ExecutaComando(sql, valores);
    let lista = [];
    for (let i = 0; i < rows.length; i++) {
      lista.push(
        new AlunoModel(
          rows[i]['aluno_RA'],
          rows[i]['aluno_nome'],
          rows[i]['aluno_CPF'],
          rows[i]['aluno_nasc'],
          rows[i]['aluno_fone'],
          rows[i]['aluno_email'],
          rows[i]['aluno_responsavel'],
          rows[i]['aluno_respCPF'],
          rows[i]['aluno_endereco'],
          rows[i]['aluno_senha']
        )
      );
    }
    return lista;
  }

  async listarProfessoresEDisciplinas(alunoRA) {
    let sql = `
      SELECT DISTINCT
        d.disciplina_id AS codigo,
        d.disciplina_nome AS disciplina,
        p.professor_nome AS professor,
        ptd.id AS professorTurmaId
      FROM 
          Aluno_turmas at
      JOIN 
          Professor_turmas_disciplinas ptd ON at.turma_id = ptd.turma_id
      JOIN 
          Disciplinas d ON ptd.disciplina_id = d.disciplina_id
      JOIN 
          Professores p ON ptd.professor_id = p.professor_id
      WHERE 
          at.aluno_RA = ?
      ORDER BY d.disciplina_nome;
    `;

    let valores = [alunoRA]; // Passando o RA como parâmetro
    let banco = new Database();
    let rows = await banco.ExecutaComando(sql, valores);
    let lista = [];
    for (let i = 0; i < rows.length; i++) {
      lista.push(rows[i]);
    }

    return lista;
  }




  
}
module.exports = AlunoModel;
