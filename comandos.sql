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

 