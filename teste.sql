SELECT id FROM Professor_turmas_disciplinas
      WHERE professor_id = 2 AND turma_id = 2 AND disciplina_id = 2

  SELECT id, titulo, descricao, data_limite, peso
      FROM Atividades
      WHERE professor_turma_disciplina_id = 12
      ORDER BY data_limite ASC

SELECT * FROM Turmas WHERE turma_id = 1