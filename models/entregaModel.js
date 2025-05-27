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
    SELECT 
      ativ.titulo AS atividade_titulo,
      a.aluno_RA AS aluno_RA,
      a.aluno_nome AS aluno_nome,
      e.anotacoes AS anotacoes,
      e.nome_arquivo AS nome_arquivo,
      e.nota AS nota,
      e.data_entrega AS data_entrega
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
  let rows = await banco.ExecutaComando(sql, valores);
  return rows;
}

  async gravaAtividade() {//implementando sem envio de arquivo
  let banco = new Database();

  if (this.#entrega_id == 0 || !this.#entrega_id) {
    const sql = `
      INSERT INTO Entregas (atividade_id, aluno_RA, professor_turma_disciplina_id, data_entrega, anotacoes, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const valores = [
      this.#atividade_id,
      this.#aluno_RA,
      this.#professor_turma_disciplina_id,
      this.#data_entrega,
      this.#anotacoes,
      this.#status
    ];
    return await banco.ExecutaComando(sql, valores);
    //se ele puder ainda entregar
  } else {
    const sql = `
      UPDATE Entregas
      SET data_entrega = ?, anotacoes = ?, status = ?
      WHERE entrega_id = ?
    `;
    const valores = [
      this.#data_entrega,
      this.#anotacoes,
      this.#status,
      this.#entrega_id
    ];
    return await banco.ExecutaComando(sql, valores);
  }
}



  //obtendo o status da entrega
  async obterEntrega(atividadeId, alunoRA) {
  const sql = `
    SELECT * FROM Entregas
    WHERE atividade_id = ? AND aluno_RA = ?
    LIMIT 1
  `;
  const banco = new Database();
  const resultados = await banco.ExecutaComando(sql, [atividadeId, alunoRA]);
  return resultados[0] || null;
}

}

module.exports = EntregaModel;
