SELECT id FROM Professor_turmas_disciplinas
      WHERE professor_id = 2 AND turma_id = 2 AND disciplina_id = 2

  SELECT id, titulo, descricao, data_limite, peso
      FROM Atividades
      WHERE professor_turma_disciplina_id = 12
      ORDER BY data_limite ASC

SELECT * FROM Turmas WHERE turma_id = 2


SELECT 
    ativ.titulo AS atividade_titulo,
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
    ptd.id = 11 AND
    ativ.atividade_id = 1
ORDER BY 
    a.aluno_nome ASC;

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
      ptd.id = 11 AND
      ativ.atividade_id = 2
    ORDER BY 
      a.aluno_nome ASC;