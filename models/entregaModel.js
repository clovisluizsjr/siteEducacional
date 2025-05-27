const Database = require('../utils/database');

class EntregaModel {
  #entrega_id;
  #atividade_id;
  #aluno_RA;
  #professor_turma_disciplina_id;
  #data_entrega;
  #anotacoes;
  #nota;
  #arquivo;
  #nome_arquivo;
  #feedback;
  #status;

  get entrega_id() { return this.#entrega_id }
  set entrega_id(value) { this.#entrega_id = value }
  get atividade_id() { return this.#atividade_id }
  set atividade_id(value) { this.#atividade_id = value }
  get aluno_RA() { return this.#aluno_RA }
  set aluno_RA(value) { this.#aluno_RA = value }
  get professor_turma_disciplina_id() { return this.#professor_turma_disciplina_id }
  set professor_turma_disciplina_id(value) { this.#professor_turma_disciplina_id = value }
  get data_entrega() { return this.#data_entrega }
  set data_entrega(value) { this.#data_entrega = value }
  get anotacoes() { return this.#anotacoes }
  set anotacoes(value) { this.#anotacoes = value }
  get nota() { return this.#nota }
  set nota(value) { this.#nota = value }
  get arquivo() { return this.#arquivo }
  set arquivo(value) { this.#arquivo = value }
  get nome_arquivo() { return this.#nome_arquivo }
  set nome_arquivo(value) { this.#nome_arquivo = value }
  get feedback() { return this.#feedback }
  set feedback(value) { this.#feedback = value }
  get status() { return this.#status }
  set status(value) { this.#status = value }
  
  constructor(
    entrega_id,
    atividade_id,
    aluno_RA,
    professor_turma_disciplina_id,
    data_entrega,
    anotacoes,
    nota,
    arquivo,
    nome_arquivo,
    feedback,
    status
  ) {
    this.#entrega_id = entrega_id;
    this.#atividade_id = atividade_id;
    this.#aluno_RA = aluno_RA;
    this.#professor_turma_disciplina_id = professor_turma_disciplina_id;
    this.#data_entrega = data_entrega;
    this.#anotacoes = anotacoes;
    this.#nota = nota;
    this.#arquivo = arquivo;
    this.#nome_arquivo = nome_arquivo;
    this.#feedback = feedback;
    this.#status = status;
  }

  async listarEntregas(professorTurmaId, atividadeId) {
    let sql = `
      SELECT ativ.titulo AS atividade_titulo,
      a.aluno_RA,
      a.aluno_nome,
      e.anotacoes,
      e.nome_arquivo,
      e.nota,
      e.data_entrega
    FROM 
      Professor_turmas_disciplinas ptd
    JOIN 
      Atividades ativ ON ptd.id = ativ.professor_turma_disciplina_id
    JOIN 
      Aluno_turmas at ON ptd.turma_id = at.turma_id
    JOIN 
      Alunos a ON at.aluno_RA = a.aluno_RA
    LEFT JOIN 
      Entregas e ON a.aluno_RA = e.aluno_RA AND e.atividade_id = ativ.atividade_id
    WHERE 
      ptd.id = ? AND
      ativ.atividade_id = ?
    ORDER BY 
      a.aluno_nome ASC;
    `;
    let valores = [professorTurmaId, atividadeId];
    let banco = new Database();
    let lista = [];
    let rows = await banco.ExecutaComando(sql, valores);
    for (let i = 0; i < rows.length; i++) {
      lista.push(rows[i]);
    }

    return lista;
  }

  async gravaAtividade() { // implementado sem envio de arquivo
    if (this.#entrega_id == 0) {
      let sql = `
      INSERT INTO Entregas (atividade_id, aluno_RA, professor_turma_disciplina_id, data_entrega, anotacoes, status)
      VALUES (?, ?, ?, ?, ?, ?)
      `
      let valores = [
        this.#atividade_id,
        this.#aluno_RA,
        this.#professor_turma_disciplina_id,
        this.#data_entrega,
        this.#anotacoes,
        this.#status
      ]
      let banco = new Database();
      let resultado = await banco.ExecutaComando(sql, valores);
      return resultado;
      
    }
  }
}

module.exports = EntregaModel;
