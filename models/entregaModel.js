const Database = require('../utils/database');

class EntregaModel {
  async listarEntregas(professorTurmaId, atividadeId) {
    let sql = `
      SELECT ativ.titulo AS atividade_titulo,
      a.aluno_RA,
      a.aluno_nome,
      e.conteudo,
      e.nota,
      e.data_entrega,
      CASE 
          WHEN e.conteudo IS NULL THEN 'Pendente'
          WHEN e.nota IS NULL THEN 'pendente'
          ELSE 'corrigido'
      END AS status_entrega
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
}

module.exports = EntregaModel;