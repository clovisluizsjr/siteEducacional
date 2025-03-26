/* CRIAR A TABELA DE SÉRIES*/
CREATE TABLE Series(		-- EX: 9º ano, 1º EM
	serie_id INT NOT NULL AUTO_INCREMENT,			-- id da série
    serie_nome VARCHAR (50) NOT NULL,				-- nome da série
    serie_quantMAX INT,								-- quantidade maxima de alunos de uma série
    serie_quantidadeALU INT,						-- quantidade atual de alunos matriculados na turma
    
    CONSTRAINT pk_Series PRIMARY KEY (serie_id)
);

/* CRIAR A TABELA DE PROFESSORES */
CREATE TABLE Professores(
	professor_id INT NOT NULL AUTO_INCREMENT,			-- id de identificação de um professor
    professor_nome VARCHAR(100),						-- nome completo de uma professor
    professor_CPF VARCHAR(14) NOT NULL,					-- cpf de um professor // padrão 000.000.000-00
    professor_nasc DATE NOT NULL,						-- data de nascimento de um professor
    professor_fone VARCHAR(20),							-- telefone de contato de um professor
    professor_endereco VARCHAR(100),					-- endereço de um professor
    professor_email VARCHAR(100),						-- email de um professor
    professor_senha VARCHAR(50),						-- senha do professor para fazer login (siga o padrao primeiro nome do professor + 3 ultimos digitos do CPF)
    
    CONSTRAINT pk_Professores PRIMARY KEY (professor_id),
    CONSTRAINT uk_Professores UNIQUE (professor_CPF, professor_email)
);

/* CRIAR A TABELA DE ALUNO */
CREATE TABLE Alunos(
	aluno_RA VARCHAR(14),						-- registro acadêmico do aluno
    aluno_nome VARCHAR(100) NOT NULL,			-- nome do aluno
    aluno_CPF VARCHAR(20) NOT NULL,				-- cpf do aluno		// padrão 000.000.000-00
    aluno_nasc DATE NOT NULL,					-- data de nascimento do aluno
    aluno_fone VARCHAR(20),						-- telefone de contato do aluno
    aluno_email VARCHAR(100),					-- email do aluno, usado inclusive para login
    aluno_mae VARCHAR(100),						-- nome da mãe completo
    aluno_pai VARCHAR(100),						-- nome do pai completo
    aluno_respCPF VARCHAR(14),					-- dados financeiros para compra de material
    aluno_endereco VARCHAR(100),				-- endereço do aluno
    aluno_senha VARCHAR(50),					-- senha do login do aluno para acessar o sistema		(siga o padrao primeiro nome do aluno + 3 ultimos digitos do CPF)
    aluno_statusFinanceiro BOOLEAN,				-- revela a situação do aluno no âmbito financeiro
    
    serie_id INT,								-- liga o aluno a uma série específica
    
    CONSTRAINT pk_Alunos PRIMARY KEY (aluno_RA),
    CONSTRAINT fk_Alunos2 FOREIGN KEY (serie_id) REFERENCES Series (serie_id),
    CONSTRAINT uk_Alunos1 UNIQUE (aluno_CPF, aluno_RA)
);

/* CRIAR A TABELA DE DISCIPLINAS */

CREATE TABLE Disciplinas (
    disciplina_id INT AUTO_INCREMENT,				-- identificação da disciplina
    disciplina_nome VARCHAR (20) NOT NULL,			-- nome da disciplina	
    disciplina_horario DATETIME,						-- horário que ocorre a disciplina	
    disciplina_categoria CHAR,						-- categoria da disciplina ('O' para obrigatória, 'E' para eletiva)
    professor_id INT,						-- id de identificação do professor
    serie_id INT,									-- série que aquela disciplina pertence

    
    CONSTRAINT pk_Disciplinas PRIMARY KEY (disciplina_id),
    CONSTRAINT fk_Disciplinas1 FOREIGN KEY (professor_id) REFERENCES Professores (professor_id),
    CONSTRAINT fk_Disciplinas2 FOREIGN KEY (serie_id) REFERENCES Series (serie_id),
    CONSTRAINT uk_Disciplinas CHECK (disciplina_categoria IN ('O', 'E'))
);

/* CRIAR A TABELA DE ATIVIDADES QUE REGISTRA AS ATIVIDADES QUE O PROFESSOR CRIA */
 CREATE TABLE AtividadeProfessor (							-- para o professor postar a atividade para uma serie específica
	atividadeProf_idProf INT NOT NULL AUTO_INCREMENT,		-- numéro de identificação da atividade
    atividadeProf_tituloProf VARCHAR(100),					-- título da atividade
    atividadeProf_descricaoProf VARCHAR(1000),
    atividadeProf_notaProf FLOAT,							-- o valor máximo da nota, isto é, o peso da atividade
    atividadeProf_prazoProf DATETIME,						-- prazo para entrega da atividade
    
    disciplina_id INT,						-- relacionar a atividade a disciplina específica
    serie_id INT,							-- relacionar a atividade a turma específica
    
    CONSTRAINT pk_atividadeProfessor PRIMARY KEY (atividadeProf_idProf),
    CONSTRAINT fk_atividadeProfessor1 FOREIGN KEY (disciplina_id) REFERENCES Disciplinas (disciplina_id),
    CONSTRAINT fk_atividadeProfessor2 FOREIGN KEY (serie_id) REFERENCES Series (serie_id)
 );

 /* CRIAÇÃO DA TABELA DE ATIVIDADES QUE APARECE PARA OS ALUNOS E ELES ENTREGAM */
  CREATE TABLE AtividadeAluno(							-- tabela que contem relacao das atividades postadas
	atividadeAluno_id INT NOT NULL AUTO_INCREMENT,		-- identificacao da atividade do aluno
    
    aluno_RA VARCHAR(14),					-- identificacao do RA do aluno
    
    atividadeAluno_notaAluno FLOAT,						-- qual nota o aluno tirou na atividade
    atividadeAluno_feedbackProf VARCHAR(1000),			-- feedback que o professor concedeu após corrigir a atividade do aluno
    atividadeAluno_prazoEntrega DATETIME,				-- em qual data o aluno entregou
    
    atividadeProf_idProf INT,							-- para saber qual atividade que o prof deu
    disciplina_id INT,									-- qual disciplina pertence a atividade
    
    CONSTRAINT pk_atividadeAluno PRIMARY KEY (atividadeAluno_id),
    CONSTRAINT fk_atividadeAluno1 FOREIGN KEY (atividadeProf_idProf) REFERENCES AtividadeProfessor (atividadeProf_idProf),
    CONSTRAINT fk_atividadeAluno2 FOREIGN KEY (disciplina_id) REFERENCES Disciplinas (disciplina_id),
    CONSTRAINT fk_atividadeAluno3 FOREIGN KEY (aluno_RA) REFERENCES Alunos (aluno_RA)
 );

 /* Preciso povoar todas as tabelas com 15 linhas, incluindo atividades que já foram corrigidas pelos professora (prazo da atividade 01 de janeiro de 2025), atividades que o aluno não entregou mas fechou o prazo de vencimento (prazo da atividade 01 de fevereiro de 2025) e atividades que estão em aberto ainda (prazo da atividade 01 de dezembro de 2025).*/
 -- Inserir 15 séries
INSERT INTO Series (serie_nome, serie_quantMAX, serie_quantidadeALU) VALUES
('1º Ano Fundamental', 30, 25),
('2º Ano Fundamental', 30, 28),
('3º Ano Fundamental', 30, 27),
('4º Ano Fundamental', 30, 26),
('5º Ano Fundamental', 30, 29),
('6º Ano Fundamental', 30, 25),
('7º Ano Fundamental', 30, 28),
('8º Ano Fundamental', 30, 27),
('9º Ano Fundamental', 30, 26),
('1º Ano Médio', 35, 32),
('2º Ano Médio', 35, 34),
('3º Ano Médio', 35, 33),
('Pré-Vestibular', 40, 38),
('EJA 1ª Fase', 25, 20),
('EJA 2ª Fase', 25, 22);

-- Inserir 15 professores
INSERT INTO Professores (professor_nome, professor_CPF, professor_nasc, professor_fone, professor_endereco, professor_email, professor_senha) VALUES
('Maria Silva', '111.222.333-44', '1980-05-15', '(11) 9999-8888', 'Rua A, 123 - SP', 'maria.silva@escola.com', 'Maria344'),
('João Santos', '222.333.444-55', '1975-08-20', '(11) 8888-7777', 'Av B, 456 - SP', 'joao.santos@escola.com', 'Joao555'),
('Ana Oliveira', '333.444.555-66', '1982-03-10', '(11) 7777-6666', 'Rua C, 789 - SP', 'ana.oliveira@escola.com', 'Ana666'),
('Carlos Pereira', '444.555.666-77', '1978-11-25', '(11) 6666-5555', 'Av D, 101 - SP', 'carlos.pereira@escola.com', 'Carlos777'),
('Lucia Fernandes', '555.666.777-88', '1985-07-30', '(11) 5555-4444', 'Rua E, 202 - SP', 'lucia.fernandes@escola.com', 'Lucia888'),
('Pedro Alves', '666.777.888-99', '1972-09-12', '(11) 4444-3333', 'Av F, 303 - SP', 'pedro.alves@escola.com', 'Pedro899'),
('Fernanda Costa', '777.888.999-00', '1983-04-05', '(11) 3333-2222', 'Rua G, 404 - SP', 'fernanda.costa@escola.com', 'Fernanda000'),
('Ricardo Souza', '888.999.000-11', '1970-12-18', '(11) 2222-1111', 'Av H, 505 - SP', 'ricardo.souza@escola.com', 'Ricardo111'),
('Patricia Lima', '999.000.111-22', '1987-06-22', '(11) 1111-0000', 'Rua I, 606 - SP', 'patricia.lima@escola.com', 'Patricia222'),
('Marcos Rocha', '000.111.222-33', '1976-02-28', '(11) 9999-9999', 'Av J, 707 - SP', 'marcos.rocha@escola.com', 'Marcos233'),
('Juliana Gomes', '123.456.789-00', '1984-10-15', '(11) 8888-8888', 'Rua K, 808 - SP', 'juliana.gomes@escola.com', 'Juliana000'),
('Roberto Martins', '234.567.890-11', '1973-01-20', '(11) 7777-7777', 'Av L, 909 - SP', 'roberto.martins@escola.com', 'Roberto111'),
('Tatiana Dias', '345.678.901-22', '1981-08-05', '(11) 6666-6666', 'Rua M, 1010 - SP', 'tatiana.dias@escola.com', 'Tatiana222'),
('Felipe Castro', '456.789.012-33', '1979-03-30', '(11) 5555-5555', 'Av N, 1111 - SP', 'felipe.castro@escola.com', 'Felipe333'),
('Camila Nunes', '567.890.123-44', '1986-11-12', '(11) 4444-4444', 'Rua O, 1212 - SP', 'camila.nunes@escola.com', 'Camila444');

-- Inserir 15 alunos
INSERT INTO Alunos (aluno_RA, aluno_nome, aluno_CPF, aluno_nasc, aluno_fone, aluno_email, aluno_mae, aluno_pai, aluno_respCPF, aluno_endereco, aluno_senha, aluno_statusFinanceiro, serie_id) VALUES
('20230001', 'Lucas Oliveira', '111.222.333-44', '2010-03-15', '(11) 9999-1111', 'lucas.oliveira@aluno.com', 'Ana Oliveira', 'Carlos Oliveira', '444.555.666-77', 'Rua P, 1313 - SP', 'Lucas344', TRUE, 1),
('20230002', 'Mariana Santos', '222.333.444-55', '2010-05-20', '(11) 8888-2222', 'mariana.santos@aluno.com', 'Lucia Santos', 'Paulo Santos', '555.666.777-88', 'Av Q, 1414 - SP', 'Mariana555', TRUE, 1),
('20230003', 'Gabriel Silva', '333.444.555-66', '2009-07-10', '(11) 7777-3333', 'gabriel.silva@aluno.com', 'Fernanda Silva', 'Roberto Silva', '666.777.888-99', 'Rua R, 1515 - SP', 'Gabriel666', TRUE, 2),
('20230004', 'Isabela Costa', '444.555.666-77', '2009-09-25', '(11) 6666-4444', 'isabela.costa@aluno.com', 'Patricia Costa', 'Marcos Costa', '777.888.999-00', 'Av S, 1616 - SP', 'Isabela777', TRUE, 2),
('20230005', 'Rafael Pereira', '555.666.777-88', '2008-11-30', '(11) 5555-5555', 'rafael.pereira@aluno.com', 'Juliana Pereira', 'Felipe Pereira', '888.999.000-11', 'Rua T, 1717 - SP', 'Rafael888', TRUE, 3),
('20230006', 'Beatriz Alves', '666.777.888-99', '2008-01-12', '(11) 4444-6666', 'beatriz.alves@aluno.com', 'Tatiana Alves', 'Ricardo Alves', '999.000.111-22', 'Av U, 1818 - SP', 'Beatriz899', FALSE, 3),
('20230007', 'Matheus Fernandes', '777.888.999-00', '2007-04-05', '(11) 3333-7777', 'matheus.fernandes@aluno.com', 'Camila Fernandes', 'Roberto Fernandes', '000.111.222-33', 'Rua V, 1919 - SP', 'Matheus000', TRUE, 4),
('20230008', 'Laura Souza', '888.999.000-11', '2007-06-18', '(11) 2222-8888', 'laura.souza@aluno.com', 'Maria Souza', 'Carlos Souza', '123.456.789-00', 'Av W, 2020 - SP', 'Laura111', TRUE, 4),
('20230009', 'Felipe Lima', '999.000.111-22', '2006-08-22', '(11) 1111-9999', 'felipe.lima@aluno.com', 'Ana Lima', 'João Lima', '234.567.890-11', 'Rua X, 2121 - SP', 'Felipe222', FALSE, 5),
('20230010', 'Sophia Rocha', '000.111.222-33', '2006-10-28', '(11) 9999-0000', 'sophia.rocha@aluno.com', 'Lucia Rocha', 'Paulo Rocha', '345.678.901-22', 'Av Y, 2222 - SP', 'Sophia233', TRUE, 5),
('20230011', 'Enzo Gomes', '123.456.789-00', '2005-12-15', '(11) 8888-1111', 'enzo.gomes@aluno.com', 'Fernanda Gomes', 'Roberto Gomes', '456.789.012-33', 'Rua Z, 2323 - SP', 'Enzo000', TRUE, 6),
('20230012', 'Valentina Martins', '234.567.890-11', '2005-02-20', '(11) 7777-2222', 'valentina.martins@aluno.com', 'Patricia Martins', 'Marcos Martins', '567.890.123-44', 'Av AA, 2424 - SP', 'Valentina111', TRUE, 6),
('20230013', 'Davi Dias', '345.678.901-22', '2004-04-05', '(11) 6666-3333', 'davi.dias@aluno.com', 'Juliana Dias', 'Felipe Dias', '678.901.234-55', 'Rua BB, 2525 - SP', 'Davi222', FALSE, 7),
('20230014', 'Helena Castro', '456.789.012-33', '2004-06-30', '(11) 5555-4444', 'helena.castro@aluno.com', 'Tatiana Castro', 'Ricardo Castro', '789.012.345-66', 'Av CC, 2626 - SP', 'Helena333', TRUE, 7),
('20230015', 'Arthur Nunes', '567.890.123-44', '2003-08-12', '(11) 4444-5555', 'arthur.nunes@aluno.com', 'Camila Nunes', 'Roberto Nunes', '890.123.456-77', 'Rua DD, 2727 - SP', 'Arthur444', TRUE, 8);

-- Inserir 15 disciplinas
INSERT INTO Disciplinas (disciplina_nome, disciplina_horario, disciplina_categoria, professor_id, serie_id) VALUES
('Matemática', '2023-01-01 08:00:00', 'O', 1, 1),
('Português', '2023-01-01 09:30:00', 'O', 2, 1),
('Ciências', '2023-01-01 11:00:00', 'O', 3, 2),
('História', '2023-01-01 13:30:00', 'O', 4, 2),
('Geografia', '2023-01-01 15:00:00', 'O', 5, 3),
('Inglês', '2023-01-02 08:00:00', 'O', 6, 3),
('Artes', '2023-01-02 09:30:00', 'E', 7, 4),
('Educação Física', '2023-01-02 11:00:00', 'E', 8, 4),
('Filosofia', '2023-01-02 13:30:00', 'O', 9, 5),
('Sociologia', '2023-01-02 15:00:00', 'O', 10, 5),
('Física', '2023-01-03 08:00:00', 'O', 11, 6),
('Química', '2023-01-03 09:30:00', 'O', 12, 6),
('Biologia', '2023-01-03 11:00:00', 'O', 13, 7),
('Literatura', '2023-01-03 13:30:00', 'E', 14, 7),
('Redação', '2023-01-03 15:00:00', 'O', 15, 8);

-- Inserir 15 atividades de professores (5 de cada tipo)
-- Atividades já corrigidas (prazo 01/01/2025)
INSERT INTO AtividadeProfessor (atividadeProf_tituloProf, atividadeProf_descricaoProf, atividadeProf_notaProf, atividadeProf_prazoProf, disciplina_id, serie_id) VALUES
('Prova de Matemática', 'Prova sobre equações de primeiro grau', 10.0, '2025-01-01 23:59:59', 1, 1),
('Redação sobre férias', 'Escreva uma redação sobre suas férias', 5.0, '2025-01-01 23:59:59', 2, 1),
('Experimento de Ciências', 'Relatório sobre o experimento realizado em aula', 8.0, '2025-01-01 23:59:59', 3, 2),
('Trabalho de História', 'Pesquisa sobre o período colonial', 7.0, '2025-01-01 23:59:59', 4, 2),
('Mapa de Geografia', 'Elaborar mapa político do Brasil', 6.0, '2025-01-01 23:59:59', 5, 3);

-- Atividades não entregues (prazo 01/02/2025)
INSERT INTO AtividadeProfessor (atividadeProf_tituloProf, atividadeProf_descricaoProf, atividadeProf_notaProf, atividadeProf_prazoProf, disciplina_id, serie_id) VALUES
('Teste de Inglês', 'Teste sobre verbos no passado', 10.0, '2025-02-01 23:59:59', 6, 3),
('Projeto de Artes', 'Criação de uma obra expressionista', 9.0, '2025-02-01 23:59:59', 7, 4),
('Relatório de Educação Física', 'Análise de um jogo de basquete', 5.0, '2025-02-01 23:59:59', 8, 4),
('Ensaio Filosófico', 'Reflexão sobre ética em Aristóteles', 8.0, '2025-02-01 23:59:59', 9, 5),
('Pesquisa Sociológica', 'Análise de movimentos sociais', 7.0, '2025-02-01 23:59:59', 10, 5);

-- Atividades em aberto (prazo 01/12/2025)
INSERT INTO AtividadeProfessor (atividadeProf_tituloProf, atividadeProf_descricaoProf, atividadeProf_notaProf, atividadeProf_prazoProf, disciplina_id, serie_id) VALUES
('Lista de Física', 'Exercícios sobre cinemática', 10.0, '2025-12-01 23:59:59', 11, 6),
('Experimento de Química', 'Relatório sobre reações químicas', 8.0, '2025-12-01 23:59:59', 12, 6),
('Relatório de Biologia', 'Análise de ecossistema local', 7.0, '2025-12-01 23:59:59', 13, 7),
('Análise Literária', 'Interpretação de poema modernista', 6.0, '2025-12-01 23:59:59', 14, 7),
('Redação Argumentativa', 'Texto sobre sustentabilidade', 5.0, '2025-12-01 23:59:59', 15, 8);

-- Inserir atividades dos alunos (5 corrigidas, 5 não entregues, 5 em aberto)
-- Atividades já corrigidas (entregues antes do prazo)
INSERT INTO AtividadeAluno (aluno_RA, atividadeAluno_notaAluno, atividadeAluno_feedbackProf, atividadeAluno_prazoEntrega, atividadeProf_idProf, disciplina_id) VALUES
('20230001', 9.0, 'Excelente desempenho!', '2024-12-28 10:30:00', 1, 1),
('20230002', 8.5, 'Bom trabalho, poderia se aprofundar mais', '2024-12-29 11:45:00', 1, 1),
('20230003', 7.0, 'Relatório completo, mas com alguns erros', '2024-12-30 09:15:00', 3, 3),
('20230004', 6.5, 'Conteúdo correto, mas falta organização', '2024-12-27 14:20:00', 4, 4),
('20230005', 5.0, 'Mapa correto, mas sem legendas completas', '2024-12-31 16:10:00', 5, 5);

-- Atividades não entregues (prazo passado sem entrega)
-- Não inserimos registros para estas atividades, pois não foram entregues

-- Atividades em aberto (ainda podem ser entregues)
INSERT INTO AtividadeAluno (aluno_RA, atividadeAluno_notaAluno, atividadeAluno_feedbackProf, atividadeAluno_prazoEntrega, atividadeProf_idProf, disciplina_id) VALUES
('20230011', NULL, NULL, NULL, 11, 11),
('20230012', NULL, NULL, NULL, 12, 12),
('20230013', NULL, NULL, NULL, 13, 13),
('20230014', NULL, NULL, NULL, 14, 14),
('20230015', NULL, NULL, NULL, 15, 15);