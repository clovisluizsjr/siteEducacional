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
      INSERT INTO Entregas (atividade_id, aluno_RA, professor_turma_disciplina_id, data_entrega, anotacoes, nota, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
      const valores = [
        this.#atividade_id,
        this.#aluno_RA,
        this.#professor_turma_disciplina_id,
        this.#data_entrega,
        this.#anotacoes,
        this.#nota || null,
        this.#status
      ];
      return await banco.ExecutaComando(sql, valores);
      //se ele puder ainda entregar
    } else if (!this.#nota) {
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
    } else { // professor altera uma nota
      const sql = `
      UPDATE Entregas
      SET nota = ?, status = ?
      WHERE entrega_id = ?
      `;
      const valores = [
        this.#nota,
        this.#status,  // Corrigido para #status
        this.#entrega_id  // Adicionado o ID para a cláusula WHERE
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


  async getNotasPorAlunoEDisciplina(alunoRA, disciplinaId) {
    let sql = `
    SELECT e.atividade_id, e.nota
    FROM Entregas e
    JOIN Atividades a ON a.atividade_id = e.atividade_id
    JOIN Professor_turmas_disciplinas ptd ON ptd.id = a.professor_turma_disciplina_id
    WHERE ptd.disciplina_id = ? AND e.aluno_RA = ?
  `;
    let banco = new Database();
    return await banco.ExecutaComando(sql, [disciplinaId, alunoRA]);
  }

 async relatorioFiltrado(professorId, termoBusca = "") {
    let sql = `
        SELECT
            t.turma_id,
            t.turma_nome,
            d.disciplina_id,
            d.disciplina_nome,
            a.atividade_id,
            a.titulo AS atividade_titulo,
            al.aluno_RA,
            al.aluno_nome,
            e.nota
        FROM
            Professor_turmas_disciplinas ptd
        JOIN Turmas t ON ptd.turma_id = t.turma_id
        JOIN Disciplinas d ON ptd.disciplina_id = d.disciplina_id
        JOIN Atividades a ON a.professor_turma_disciplina_id = ptd.id
        JOIN Aluno_turmas at ON at.turma_id = t.turma_id
        JOIN Alunos al ON al.aluno_RA = at.aluno_RA
        LEFT JOIN Entregas e ON e.atividade_id = a.atividade_id AND e.aluno_RA = al.aluno_RA
        WHERE
            ptd.professor_id = ?
    `;

    const params = [professorId];

    if (termoBusca && termoBusca.trim() !== "") {
        sql += `
            AND (
                t.turma_nome LIKE ?
                OR d.disciplina_nome LIKE ?
                OR a.titulo LIKE ?
                OR al.aluno_nome LIKE ?
                OR al.aluno_RA LIKE ?
            )
        `;

        const termo = `%${termoBusca}%`;
        params.push(termo, termo, termo, termo, termo);
    }

    sql += `
        ORDER BY
        t.turma_nome, d.disciplina_nome, a.titulo, al.aluno_nome;
    `;

    const banco = new Database();
    return await banco.ExecutaComando(sql, params);
}

}

module.exports = EntregaModel;
