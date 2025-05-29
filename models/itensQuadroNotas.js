const Database = require('../utils/database');

class ItensQuadroNotasModel {
  #id;
  #quadro;
  #atividade_id;
  #descricao;
  #peso;
  #tipo;

  get id() {
    return this.#id;
  }
  set id(value) {
    this.#id = value;
  }

  get quadro() {
    return this.#quadro;
  }
  set quadro(value) {
    this.#quadro = value;
  }

  get atividade_id() {
    return this.#atividade_id;
  }
  set atividade_id(value) {
    this.#atividade_id = value;
  }

  get descricao() {
    return this.#descricao;
  }
  set descricao(value) {
    this.#descricao = value;
  }

  get peso() {
    return this.#peso;
  }
  set peso(value) {
    this.#peso = value;
  }

  get tipo() {
    return this.#tipo;
  }
  set tipo(value) {
    this.#tipo = value;
  }

  constructor(id, quadro, atividade_id, descricao, peso, tipo) {
    this.#id = id;
    this.#quadro = quadro;
    this.#atividade_id = atividade_id;
    this.#descricao = descricao;
    this.#peso = peso;
    this.#tipo = tipo;
  }

  async gravarItem() {
    const banco = new Database();
    const sql = `
        INSERT INTO ItensQuadroNotas (quadro_id, atividade_id, descricao, peso, tipo)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            descricao = VALUES(descricao),
            peso = VALUES(peso),
            tipo = VALUES(tipo)
    `;
    const valores = [
      this.#quadro,
      this.#atividade_id,
      this.#descricao,
      this.#peso,
      this.#tipo,
    ];
    return await banco.ExecutaComando(sql, valores);
  }

  async listarPorQuadro(quadroId) {
    const banco = new Database();
    const sql = `SELECT * FROM ItensQuadroNotas WHERE quadro_id = ?`;
    const valores = [quadroId];
    const rows = await banco.ExecutaComando(sql, valores);

    const lista = [];
    for (let i = 0; i < rows.length; i++) {
      lista.push(
        new ItensQuadroNotasModel(
          rows[i]['id'],
          rows[i]['quadro_id'],
          rows[i]['atividade_id'],
          rows[i]['descricao'],
          rows[i]['peso'],
          rows[i]['tipo']
        )
      );
    }
    return lista;
  }

  async getQuadroAluno(alunoRA, professorTurmaId) {
    let sql = `
      SELECT 
    a.atividade_id,
    a.titulo, 
    iq.peso, 
    ent.nota,
    ent.entrega_id,
    ent.status
    FROM ItensQuadroNotas iq
    JOIN Atividades a ON a.atividade_id = iq.atividade_id
    JOIN Professor_turmas_disciplinas ptd ON ptd.id = a.professor_turma_disciplina_id
    LEFT JOIN Entregas ent ON ent.atividade_id = a.atividade_id AND ent.aluno_RA = ?
    WHERE ptd.id = ?
    `
    let banco = new Database();
    let valores = [alunoRA, professorTurmaId];
    let rows = await banco.ExecutaComando(sql, valores);

    let lista = [];
    for (let i = 0; i < rows.length; i++) {
      lista.push(rows[i]);
    }

    return lista;
  }

  async getPesosPorDisciplina(disciplinaId) {
    let sql = `
    SELECT iq.atividade_id, iq.peso
  FROM ItensQuadroNotas iq
  JOIN Atividades a ON a.atividade_id = iq.atividade_id
  JOIN Professor_turmas_disciplinas ptd ON ptd.id = a.professor_turma_disciplina_id
  WHERE ptd.disciplina_id = ?
  `;
    let banco = new Database();
    return await banco.ExecutaComando(sql, [disciplinaId]);
  }
}

module.exports = ItensQuadroNotasModel;
