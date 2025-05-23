CREATE TABLE Alunos (
  aluno_RA VARCHAR(14) PRIMARY KEY,
  aluno_nome VARCHAR(100) NOT NULL,
  aluno_CPF VARCHAR(20) UNIQUE NOT NULL,
  aluno_nasc DATE NOT NULL, 
  aluno_fone VARCHAR(20),
  aluno_email VARCHAR(100) UNIQUE NOT NULL,
  aluno_responsavel VARCHAR(100),
  aluno_respCPF VARCHAR(14),
  aluno_endereco VARCHAR(100),
  aluno_senha VARCHAR(255) NOT NULL
);
CREATE TABLE Professores (
  professor_id INT PRIMARY KEY,
  professor_nome VARCHAR(100) NOT NULL,
  professor_CPF VARCHAR(14) UNIQUE NOT NULL,
  professor_nasc DATE NOT NULL,
  professor_fone VARCHAR(20),
  professor_endereco VARCHAR(100),
  professor_email VARCHAR(100) NOT NULL,
  professor_senha VARCHAR(50) NOT NULL
);
CREATE TABLE Turmas (
  turma_id INT PRIMARY KEY,
  turma_nome VARCHAR(50) NOT NULL,
  turma_quantALU INT,
  turma_quantMAX INT
);
CREATE TABLE Disciplinas (
  disciplina_id INT PRIMARY KEY,
  disciplina_nome VARCHAR(100) NOT NULL
);
CREATE TABLE Professor_turmas_disciplinas (
  id INT PRIMARY KEY,
  professor_id INT NOT NULL,
  turma_id INT NOT NULL,
  disciplina_id INT NOT NULL,
  FOREIGN KEY (professor_id) REFERENCES Professores(professor_id),
  FOREIGN KEY (turma_id) REFERENCES Turmas(turma_id),
  FOREIGN KEY (disciplina_id) REFERENCES Disciplinas(disciplina_id)
);
CREATE TABLE Aluno_turmas (
  id INT PRIMARY KEY,
  aluno_RA VARCHAR(14) REFERENCES Alunos(aluno_RA),
  turma_id INT REFERENCES Turmas(turma_id),
  UNIQUE (aluno_RA, turma_id)
);
CREATE TABLE Atividades (
  atividade_id INT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao VARCHAR(255),
  data_inicial DATE NOT NULL,
  data_limite DATE NOT NULL,
  professor_turma_disciplina_id INT REFERENCES Professor_turmas_disciplinas(id)
);
CREATE TABLE Entregas (
  entrega_id INT PRIMARY KEY,
  atividade_id INT REFERENCES Atividades(atividade_id),
  aluno_RA VARCHAR(14) REFERENCES Alunos(aluno_RA),
  data_entrega TIMESTAMP,
  conteudo TEXT,
  nota NUMERIC(4,2),
  status VARCHAR(20) CHECK (status IN ('pendente', 'entregue', 'corrigido', 'atrasado')) DEFAULT 'pendente',
  UNIQUE (atividade_id, aluno_RA)
);

CREATE TABLE QuadroNotas (
  id INT PRIMARY KEY,
  professor_turma_disciplina_id INT NOT NULL REFERENCES Professor_turmas_disciplinas(id),
  descricao VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(professor_turma_disciplina_id) -- Garante apenas um quadro por turma/disciplina
);

CREATE TABLE ItensQuadroNotas (
  id INT PRIMARY KEY,
  quadro_id INT NOT NULL REFERENCES QuadroNotas(id),
  atividade_id INT REFERENCES Atividades(atividade_id), -- Pode ser NULL para itens como "Participação"
  descricao VARCHAR(100) NOT NULL,
  peso NUMERIC(5,2) NOT NULL CHECK (peso > 0 AND peso <= 100),
  tipo VARCHAR(20) CHECK (tipo IN ('atividade', 'prova', 'trabalho', 'participacao', 'outro')),
  UNIQUE(quadro_id, atividade_id) -- Evita duplicação
);

ALTER TABLE Entregas ADD COLUMN professor_turma_disciplina_id INT REFERENCES Professor_turmas_disciplinas(id);

INSERT INTO Professores (professor_id, professor_nome, professor_CPF, professor_nasc, professor_fone, professor_endereco, professor_email, professor_senha) VALUES
(1, 'Maria Silva', '111.222.333-44', '1980-05-15', '(11) 9999-8888', 'Rua A, 123 - SP', 'maria.silva@escola.com', 'Maria344'),
(2, 'João Santos', '222.333.444-55', '1975-08-20', '(11) 8888-7777', 'Av B, 456 - SP', 'joao.santos@escola.com', 'Joao555'),
(3, 'Ana Oliveira', '333.444.555-66', '1982-03-10', '(11) 7777-6666', 'Rua C, 789 - SP', 'ana.oliveira@escola.com', 'Ana666'),
(4, 'Carlos Pereira', '444.555.666-77', '1978-11-25', '(11) 6666-5555', 'Av D, 101 - SP', 'carlos.pereira@escola.com', 'Carlos777'),
(5, 'Fernanda Costa', '555.666.777-88', '1985-04-12', '(11) 5555-4444', 'Rua E, 222 - SP', 'fernanda.costa@escola.com', 'Fernanda888'),
(6, 'Rafael Lima', '666.777.888-99', '1983-06-18', '(11) 4444-3333', 'Av F, 333 - SP', 'rafael.lima@escola.com', 'Rafael999'),
(7, 'Patrícia Rocha', '777.888.999-00', '1979-09-30', '(11) 3333-2222', 'Rua G, 444 - SP', 'patricia.rocha@escola.com', 'Patricia000'),
(8, 'Eduardo Almeida', '888.999.000-11', '1981-02-22', '(11) 2222-1111', 'Av H, 555 - SP', 'eduardo.almeida@escola.com', 'Eduardo111'),
(9, 'Juliana Teixeira', '999.000.111-22', '1984-12-05', '(11) 1111-0000', 'Rua I, 666 - SP', 'juliana.teixeira@escola.com', 'Juliana222'),
(10, 'Ricardo Nunes', '000.111.222-33', '1976-07-17', '(11) 1234-5678', 'Av J, 777 - SP', 'ricardo.nunes@escola.com', 'Ricardo333');

INSERT INTO Disciplinas (disciplina_id, disciplina_nome) VALUES
(1, 'Matemática'),
(2, 'Português'),
(3, 'História'),
(4, 'Geografia'),
(5, 'Física'),
(6, 'Química'),
(7, 'Biologia'),
(8, 'Inglês'),
(9, 'Educação Física'),
(10, 'Filosofia'),
(11, 'Sociologia'),
(12, 'Artes');

INSERT INTO Turmas (turma_id, turma_nome, turma_quantALU, turma_quantMAX) VALUES
(1, '1ºA', 30, 30),
(2, '1ºB', 28, 30),
(3, '2ºA', 30, 30),
(4, '2ºB', 23, 30),
(5, '3ºA', 30, 30),
(6, '3ºB', 25, 30);


INSERT INTO Alunos (aluno_RA, aluno_nome, aluno_CPF, aluno_nasc, aluno_fone, aluno_email, aluno_responsavel, aluno_respCPF, aluno_endereco, aluno_senha) VALUES
('20230001', 'Sophie Peixoto', '047.326.589-38', '2014-06-15', '+55 84 4219 4892', 'sophie.peixoto@aluno.com', 'Caio Cardoso', '571.236.849-82', 'Rua M, 777 - SP', 'Sophie809'),
('20230002', 'Manuela Ferreira', '089.753.621-59', '2015-02-21', '(071) 3513 9332', 'manuela.ferreira@aluno.com', 'Lavínia Carvalho', '157.024.836-26', 'Rua P, 415 - SP', 'Manuela989'),
('20230003', 'Helena Viana', '384.907.615-66', '2013-12-30', '+55 (061) 3209-4711', 'helena.viana@aluno.com', 'Sophia Costela', '201.543.968-42', 'Rua L, 598 - SP', 'Helena821'),
('20230004', 'Renan Peixoto', '947.352.016-61', '2014-05-31', '0900 533 0413', 'renan.peixoto@aluno.com', 'Sr. Isaac Pereira', '012.658.973-95', 'Rua E, 774 - SP', 'Renan079'),
('20230005', 'Cauã da Mota', '916.027.453-07', '2013-10-17', '+55 (061) 1730-0869', 'caua.da.mota@aluno.com', 'Francisco Campos', '314.298.067-96', 'Rua R, 723 - SP', 'Cauã893'),
('20230006', 'Noah Castro', '634.258.190-89', '2015-01-05', '+55 (081) 2258 4197', 'noah.castro@aluno.com', 'Camila Alves', '764.523.809-74', 'Rua Y, 76 - SP', 'Noah864'),
('20230007', 'Sarah Cardoso', '504.163.279-07', '2014-10-24', '11 9924 6610', 'sarah.cardoso@aluno.com', 'Caroline Melo', '238.576.401-62', 'Rua D, 363 - SP', 'Sarah469'),
('20230008', 'Dra. Kamilly Barbosa', '271.958.364-28', '2015-04-24', '84 9007-5470', 'dra..kamilly.barbosa@aluno.com', 'Caroline Vieira', '120.356.874-62', 'Rua R, 489 - SP', 'Dra.450'),
('20230009', 'Theo Almeida', '813.049.256-33', '2013-08-04', '(071) 6104-7142', 'theo.almeida@aluno.com', 'Manuela Monteiro', '124.605.739-52', 'Rua R, 938 - SP', 'Theo073'),
('20230010', 'Gabrielly Moreira', '907.563.418-84', '2013-10-27', '41 9402 2455', 'gabrielly.moreira@aluno.com', 'Sr. Joaquim Azevedo', '042.187.569-02', 'Rua V, 641 - SP', 'Gabrielly048'),
('20230011', 'Carlos Eduardo Rocha', '304.178.269-31', '2014-01-06', '84 1187 7551', 'carlos.eduardo.rocha@aluno.com', 'Ana Sophia Sales', '604.251.793-70', 'Rua H, 748 - SP', 'Carlos381'),
('20230012', 'Ana Laura Campos', '138.076.492-04', '2014-05-02', '(084) 9361-5349', 'ana.laura.campos@aluno.com', 'Leandro da Mota', '518.690.324-89', 'Rua S, 228 - SP', 'Ana298'),
('20230013', 'Luiz Felipe Novaes', '430.619.572-43', '2014-05-10', '41 5821 9729', 'luiz.felipe.novaes@aluno.com', 'Maysa Pereira', '875.639.120-02', 'Rua O, 94 - SP', 'Luiz035'),
('20230014', 'Joaquim Lopes', '502.674.139-80', '2014-11-27', '(071) 1180-1320', 'joaquim.lopes@aluno.com', 'André Porto', '528.693.741-19', 'Rua P, 112 - SP', 'Joaquim321'),
('20230015', 'Lívia Azevedo', '918.537.264-19', '2015-02-19', '(081) 6993-0024', 'livia.azevedo@aluno.com', 'Maria Fernanda Fernandes', '517.629.384-64', 'Rua K, 835 - SP', 'Lívia927'),
('20230016', 'Davi Lucca Costela', '345.069.871-01', '2015-04-10', '0500-125-6097', 'davi.lucca.costela@aluno.com', 'Laís Barros', '172.064.983-96', 'Rua R, 602 - SP', 'Davi207'),
('20230017', 'Samuel Vieira', '536.780.421-71', '2014-09-08', '(081) 1942 6418', 'samuel.vieira@aluno.com', 'Arthur Novaes', '753.920.461-34', 'Rua K, 590 - SP', 'Samuel218'),
('20230018', 'Antônio Silveira', '938.054.721-88', '2013-08-15', '+55 (011) 6961-1611', 'antônio.silveira@aluno.com', 'Stephany da Costa', '076.539.812-59', 'Rua B, 628 - SP', 'Antônio920'),
('20230019', 'João Gabriel Cardoso', '150.269.734-34', '2013-07-12', '0300-230-3104', 'joao.gabriel.cardoso@aluno.com', 'Sr. Otávio Dias', '297.038.465-56', 'Rua V, 776 - SP', 'João110'),
('20230020', 'João Guilherme Melo', '748.952.160-20', '2013-08-06', '61 9426-2235', 'joao.guilherme.melo@aluno.com', 'Elisa Duarte', '245.370.198-32', 'Rua C, 920 - SP', 'João686'),
('20230021', 'Ana Julia Cardoso', '264.731.589-28', '2013-07-23', '+55 51 7580 6606', 'ana.julia.cardoso@aluno.com', 'Sra. Laura da Rocha', '547.016.283-44', 'Rua X, 538 - SP', 'Ana288'),
('20230022', 'Sra. Juliana da Mata', '692.137.854-37', '2014-09-21', '+55 31 7340 7970', 'sra..juliana.da.mata@aluno.com', 'Heitor Correia', '482.356.071-07', 'Rua V, 604 - SP', 'Sra.842'),
('20230023', 'Marcelo Nunes', '401.258.976-85', '2014-07-01', '0800 671 4543', 'marcelo.nunes@aluno.com', 'Ana Júlia Azevedo', '148.720.965-76', 'Rua P, 677 - SP', 'Marcelo679'),
('20230024', 'Evelyn Gomes', '823.407.691-40', '2014-01-01', '(031) 5922-1166', 'evelyn.gomes@aluno.com', 'Letícia Cunha', '845.736.192-91', 'Rua L, 85 - SP', 'Evelyn315'),
('20230025', 'Dra. Gabrielly Sales', '074.153.928-41', '2013-06-07', '11 7608 1160', 'dra..gabrielly.sales@aluno.com', 'Sr. Carlos Eduardo Almeida', '493.182.607-50', 'Rua K, 866 - SP', 'Dra.102'),
('20230026', 'Raquel Melo', '625.379.140-07', '2014-06-30', '(051) 2327 5667', 'raquel.melo@aluno.com', 'Sabrina das Neves', '379.450.862-92', 'Rua X, 226 - SP', 'Raquel314'),
('20230027', 'Ana Júlia da Mata', '502.147.896-67', '2015-01-08', '11 6708 8697', 'ana.júlia.da.mata@aluno.com', 'Eloah Ribeiro', '354.068.197-39', 'Rua B, 104 - SP', 'Ana782'),
('20230028', 'Pietro Almeida', '216.584.390-15', '2014-05-06', '+55 (071) 5919-1558', 'pietro.almeida@aluno.com', 'Giovanna Fernandes', '089.127.653-02', 'Rua S, 650 - SP', 'Pietro956'),
('20230029', 'Eduardo Fernandes', '496.237.105-34', '2015-05-14', '81 1077-7067', 'eduardo.fernandes@aluno.com', 'Laura Costa', '193.087.546-01', 'Rua A, 128 - SP', 'Eduardo665'),
('20230030', 'Maria Eduarda Novaes', '023.715.846-90', '2014-04-21', '+55 51 8498 3478', 'maria.eduarda.novaes@aluno.com', 'Letícia Teixeira', '493.068.571-01', 'Rua M, 94 - SP', 'Maria390'),
('20230031', 'Enrico Gomes', '086.795.321-77', '2013-08-18', '0300 538 4331', 'enrico.gomes@aluno.com', 'Gabriela Martins', '357.241.809-79', 'Rua A, 200 - SP', 'Enrico911'),
('20230032', 'Sr. Cauê Novaes', '291.763.508-86', '2015-02-11', '+55 31 6599-2719', 'sr..caue.novaes@aluno.com', 'Luiz Miguel Moraes', '794.018.523-32', 'Rua G, 745 - SP', 'Sr.890'),
('20230033', 'Sra. Maria Cecília Lopes', '142.839.765-55', '2013-07-03', '+55 (084) 0535-7345', 'sra..maria.cecilia.lopes@aluno.com', 'Bruna Lima', '059.861.274-20', 'Rua N, 636 - SP', 'Sra.122'),
('20230034', 'Ana Carolina Araújo', '308.152.796-12', '2014-10-16', '(011) 2376-2542', 'ana.carolina.araújo@aluno.com', 'Helena Oliveira', '609.245.387-83', 'Rua U, 309 - SP', 'Ana315'),
('20230035', 'Joana da Cunha', '082.456.193-70', '2013-11-19', '+55 (051) 3028-2169', 'joana.da.cunha@aluno.com', 'Pedro Henrique Ramos', '204.953.867-74', 'Rua B, 611 - SP', 'Joana191'),
('20230036', 'Ana Laura Moraes', '427.198.653-46', '2014-02-05', '+55 81 7604-8487', 'ana.laura.moraes@aluno.com', 'Vitor Teixeira', '984.503.726-74', 'Rua L, 927 - SP', 'Ana789'),
('20230037', 'Isabel Sales', '094.582.736-92', '2015-01-01', '51 8564 3195', 'isabel.sales@aluno.com', 'Nicolas Teixeira', '528.790.463-00', 'Rua F, 715 - SP', 'Isabel690'),
('20230038', 'Dr. Gustavo Gonçalves', '576.431.092-06', '2014-04-27', '+55 81 5074 9318', 'dr..gustavo.goncalves@aluno.com', 'Emilly da Luz', '821.567.094-67', 'Rua V, 163 - SP', 'Dr.832'),
('20230039', 'Emanuelly Lima', '406.752.931-70', '2014-02-08', '+55 (071) 6208-2965', 'emanuelly.lima@aluno.com', 'Alícia Oliveira', '930.241.568-60', 'Rua T, 944 - SP', 'Emanuelly414'),
('20230040', 'Pietra Sales', '038.217.965-02', '2013-11-18', '(041) 8132-7166', 'pietra.sales@aluno.com', 'Fernando Pinto', '591.203.874-23', 'Rua N, 922 - SP', 'Pietra553'),
('20230041', 'Joana Pinto', '607.241.958-58', '2014-03-24', '(071) 8201-9550', 'joana.pinto@aluno.com', 'Diogo Correia', '870.296.351-59', 'Rua L, 398 - SP', 'Joana825'),
('20230042', 'Natália da Conceição', '926.784.035-56', '2015-04-12', '+55 84 7080 8625', 'natalia.da.conceicao@aluno.com', 'Ana Júlia Cardoso', '824.195.763-73', 'Rua A, 469 - SP', 'Natália730'),
('20230043', 'Vitor Gabriel Porto', '820.541.763-62', '2013-10-15', '(051) 9378-2527', 'vitor.gabriel.porto@aluno.com', 'Ana Carolina Viana', '185.067.329-21', 'Rua I, 139 - SP', 'Vitor293'),
('20230044', 'Lavínia Melo', '685.970.134-00', '2013-10-07', '+55 81 0593 0604', 'lavinia.melo@aluno.com', 'Ana Beatriz da Cunha', '516.032.498-42', 'Rua J, 690 - SP', 'Lavínia396'),
('20230045', 'Yasmin Ramos', '620.381.974-31', '2013-08-01', '+55 71 0502 6905', 'yasmin.ramos@aluno.com', 'Vitória Vieira', '791.604.385-84', 'Rua T, 136 - SP', 'Yasmin734'),
('20230046', 'Manuela Castro', '158.036.927-86', '2013-06-16', '+55 (011) 6528 2222', 'manuela.castro@aluno.com', 'Nina Farias', '950.386.742-83', 'Rua U, 83 - SP', 'Manuela013'),
('20230047', 'Esther Melo', '235.168.470-26', '2014-03-15', '0300 029 0622', 'esther.melo@aluno.com', 'Antônio Martins', '809.764.153-48', 'Rua H, 229 - SP', 'Esther638'),
('20230048', 'Kaique Pinto', '953.124.687-46', '2013-07-14', '+55 81 6951 6637', 'kaique.pinto@aluno.com', 'Clarice Novaes', '376.402.891-22', 'Rua S, 896 - SP', 'Kaique447'),
('20230049', 'Alexia Ribeiro', '340.829.756-83', '2013-09-08', '61 0666 1797', 'alexia.ribeiro@aluno.com', 'Davi Luiz Mendes', '762.498.015-02', 'Rua N, 791 - SP', 'Alexia604'),
('20230050', 'Pedro Lucas Moraes', '780.126.543-26', '2014-09-23', '+55 (061) 4860 6463', 'pedro.lucas.moraes@aluno.com', 'Sr. Cauê Correia', '952.034.816-60', 'Rua I, 719 - SP', 'Pedro154'),
('20230051', 'Rafaela Cardoso', '682.195.407-02', '2014-07-01', '+55 84 7594 5164', 'rafaela.cardoso@aluno.com', 'Joaquim Santos', '582.394.701-14', 'Rua R, 619 - SP', 'Rafaela784'),
('20230052', 'Dr. Lucas Silva', '468.701.952-85', '2014-11-11', '+55 (084) 9981-4926', 'dr..lucas.silva@aluno.com', 'Arthur Alves', '157.203.649-43', 'Rua J, 858 - SP', 'Dr.488'),
('20230053', 'Luiza Dias', '281.647.093-87', '2015-04-01', '41 6937-6409', 'luiza.dias@aluno.com', 'João Pedro da Cunha', '706.984.315-10', 'Rua N, 193 - SP', 'Luiza599'),
('20230054', 'Laís Barbosa', '714.693.582-55', '2013-10-06', '+55 31 8524-9271', 'lais.barbosa@aluno.com', 'Lucca Novaes', '961.237.045-16', 'Rua Y, 134 - SP', 'Laís946'),
('20230055', 'Sr. Daniel Caldeira', '283.067.495-29', '2015-05-12', '(071) 8551-0337', 'sr..daniel.caldeira@aluno.com', 'Guilherme das Neves', '075.429.618-02', 'Rua K, 4 - SP', 'Sr.270'),
('20230056', 'Vicente Moura', '623.817.954-64', '2014-09-06', '+55 81 1658 7355', 'vicente.moura@aluno.com', 'Emilly Moraes', '641.320.987-96', 'Rua V, 542 - SP', 'Vicente616'),
('20230057', 'Vinicius da Mata', '573.098.412-04', '2015-05-15', '0300 936 8473', 'vinicius.da.mata@aluno.com', 'Sr. Bryan Ribeiro', '563.870.419-10', 'Rua G, 895 - SP', 'Vinicius361'),
('20230058', 'Eduardo Martins', '219.657.034-61', '2013-05-25', '41 8021 9931', 'eduardo.martins@aluno.com', 'Sra. Catarina Almeida', '861.475.932-00', 'Rua P, 875 - SP', 'Eduardo960'),
('20230059', 'Agatha Pinto', '360.427.591-16', '2015-02-20', '(081) 7298 1411', 'agatha.pinto@aluno.com', 'Antônio da Conceição', '926.148.730-04', 'Rua O, 820 - SP', 'Agatha781'),
('20230060', 'Ana Lívia Ribeiro', '187.396.205-30', '2013-12-02', '41 1985 3735', 'ana.livia.ribeiro@aluno.com', 'Stephany Oliveira', '079.435.168-93', 'Rua Q, 837 - SP', 'Ana638'),
('20230061', 'Lucca Ribeiro', '237.968.150-30', '2013-10-11', '(031) 8102 5059', 'lucca.ribeiro@aluno.com', 'Vitor Rezende', '639.815.704-48', 'Rua I, 872 - SP', 'Lucca006'),
('20230062', 'Manuela da Mota', '526.194.380-98', '2014-08-26', '(031) 0379-5830', 'manuela.da.mota@aluno.com', 'Benício Cunha', '379.560.821-02', 'Rua R, 323 - SP', 'Manuela999'),
('20230063', 'Heloísa Sales', '325.489.617-37', '2015-03-07', '(061) 1231-2678', 'heloisa.sales@aluno.com', 'João Lucas Barbosa', '063.974.528-83', 'Rua B, 867 - SP', 'Heloísa776'),
('20230064', 'Agatha Cunha', '874.395.061-20', '2014-12-24', '+55 (021) 3695 4103', 'agatha.cunha@aluno.com', 'Alice Silva', '527.804.319-97', 'Rua X, 660 - SP', 'Agatha963'),
('20230065', 'Joana Santos', '534.061.287-26', '2013-07-07', '51 7656 0169', 'joana.santos@aluno.com', 'Beatriz da Conceição', '016.892.475-76', 'Rua R, 183 - SP', 'Joana250'),
('20230066', 'Dr. João Lucas da Mota', '890.245.731-14', '2015-02-14', '+55 (031) 4525 1986', 'dr..joao.lucas.da.mota@aluno.com', 'Fernando Cavalcanti', '812.304.965-05', 'Rua E, 278 - SP', 'Dr.377'),
('20230067', 'Rafaela da Rosa', '236.148.907-40', '2014-11-29', '(084) 8337 5248', 'rafaela.da.rosa@aluno.com', 'Stephany Almeida', '154.682.037-07', 'Rua K, 799 - SP', 'Rafaela601'),
('20230068', 'Carlos Eduardo da Cunha', '435.680.721-90', '2013-08-22', '+55 21 9752 4364', 'carlos.eduardo.da.cunha@aluno.com', 'Anthony Alves', '415.296.073-61', 'Rua S, 297 - SP', 'Carlos391'),
('20230069', 'Dra. Beatriz Ferreira', '906.324.175-52', '2015-04-26', '61 7716-5280', 'dra..beatriz.ferreira@aluno.com', 'Thales Rocha', '603.829.147-40', 'Rua D, 490 - SP', 'Dra.793'),
('20230070', 'Vitor Gabriel Moreira', '861.473.259-73', '2014-04-19', '(071) 0285-3323', 'vitor.gabriel.moreira@aluno.com', 'Yuri da Conceição', '284.701.693-78', 'Rua Q, 747 - SP', 'Vitor043'),
('20230071', 'Srta. Elisa Costela', '923.480.765-00', '2014-04-04', '+55 (041) 6863-6887', 'srta..elisa.costela@aluno.com', 'Cauê Carvalho', '801.957.342-97', 'Rua N, 112 - SP', 'Srta.094'),
('20230072', 'Isabel Novaes', '412.985.037-79', '2014-11-08', '(041) 3729-8409', 'isabel.novaes@aluno.com', 'João Felipe Moraes', '548.103.627-44', 'Rua K, 128 - SP', 'Isabel464'),
('20230073', 'Dr. Heitor Pires', '274.659.831-00', '2014-03-22', '0800 684 9336', 'dr..heitor.pires@aluno.com', 'Francisco Silva', '289.645.317-28', 'Rua J, 344 - SP', 'Dr.789'),
('20230074', 'Fernanda Ramos', '803.279.456-56', '2015-03-14', '+55 61 0329-2594', 'fernanda.ramos@aluno.com', 'Renan Aragão', '024.613.785-17', 'Rua U, 579 - SP', 'Fernanda396'),
('20230075', 'Sr. Nathan Pinto', '102.845.796-02', '2015-03-26', '51 3522 7299', 'sr..nathan.pinto@aluno.com', 'Júlia Dias', '096.481.572-94', 'Rua C, 828 - SP', 'Sr.070'),
('20230076', 'Sr. Theo Caldeira', '529.768.314-91', '2013-12-14', '+55 11 7218 4869', 'sr..theo.caldeira@aluno.com', 'Kamilly da Cruz', '962.580.431-51', 'Rua A, 101 - SP', 'Sr.354'),
('20230077', 'Rodrigo Castro', '648.902.537-00', '2014-09-03', '+55 (021) 2166 7052', 'rodrigo.castro@aluno.com', 'Samuel Novaes', '930.187.426-13', 'Rua P, 808 - SP', 'Rodrigo564'),
('20230078', 'Matheus Jesus', '690.534.127-43', '2014-10-01', '+55 (084) 9219-7444', 'matheus.jesus@aluno.com', 'João Alves', '081.952.764-58', 'Rua L, 226 - SP', 'Matheus927'),
('20230079', 'Isaac Almeida', '529.407.861-94', '2014-05-04', '(071) 7788 1157', 'isaac.almeida@aluno.com', 'Stephany Nunes', '876.401.923-31', 'Rua N, 197 - SP', 'Isaac308'),
('20230080', 'Gabrielly da Conceição', '128.034.675-26', '2014-06-30', '+55 81 9457-6959', 'gabrielly.da.conceicao@aluno.com', 'Maitê Monteiro', '380.592.467-47', 'Rua X, 29 - SP', 'Gabrielly946'),
('20230081', 'Murilo Cardoso', '715.348.026-90', '2013-06-19', '0300 505 2547', 'murilo.cardoso@aluno.com', 'Sophia Peixoto', '037.562.198-95', 'Rua D, 510 - SP', 'Murilo320'),
('20230082', 'Mirella da Cunha', '647.103.928-03', '2014-01-18', '0800 569 2866', 'mirella.da.cunha@aluno.com', 'João Lucas Nascimento', '438.219.650-70', 'Rua G, 639 - SP', 'Mirella113'),
('20230083', 'Heloísa da Conceição', '532.674.190-34', '2015-04-13', '(041) 7329-5931', 'heloisa.da.conceicao@aluno.com', 'Luna da Rocha', '469.712.350-61', 'Rua R, 847 - SP', 'Heloísa199'),
('20230084', 'Diogo da Paz', '927.084.531-14', '2014-04-10', '(051) 6010 5249', 'diogo.da.paz@aluno.com', 'Dra. Laura Lima', '867.210.493-50', 'Rua E, 578 - SP', 'Diogo468'),
('20230085', 'Alexia Silva', '513.069.248-98', '2014-11-21', '+55 81 9983 4422', 'alexia.silva@aluno.com', 'Clarice Cunha', '234.891.506-51', 'Rua P, 696 - SP', 'Alexia934'),
('20230086', 'Rafael Oliveira', '230.948.165-33', '2013-07-21', '0900-493-0239', 'rafael.oliveira@aluno.com', 'Agatha Peixoto', '297.406.853-74', 'Rua P, 651 - SP', 'Rafael626'),
('20230087', 'Gabrielly Pires', '349.027.518-79', '2013-11-04', '(011) 8612 6191', 'gabrielly.pires@aluno.com', 'Beatriz Ramos', '264.571.890-67', 'Rua H, 10 - SP', 'Gabrielly398'),
('20230088', 'Leonardo Martins', '680.235.197-86', '2014-10-10', '+55 (051) 4978 9637', 'leonardo.martins@aluno.com', 'João Vitor Carvalho', '186.043.972-13', 'Rua K, 37 - SP', 'Leonardo586'),
('20230089', 'Erick Castro', '968.041.573-20', '2013-07-28', '+55 (071) 1829-3898', 'erick.castro@aluno.com', 'Mariane Pinto', '964.537.012-43', 'Rua E, 863 - SP', 'Erick327'),
('20230090', 'Samuel Azevedo', '379.451.082-88', '2014-05-06', '(071) 1944-6541', 'samuel.azevedo@aluno.com', 'Ana Vitória Sales', '513.687.904-10', 'Rua P, 68 - SP', 'Samuel759'),
('20230091', 'Danilo Silveira', '521.489.073-79', '2013-10-21', '(021) 8666 0271', 'danilo.silveira@aluno.com', 'Pedro Lucas da Costa', '837.214.569-55', 'Rua C, 231 - SP', 'Danilo137'),
('20230092', 'Vicente da Rosa', '128.346.905-70', '2014-12-22', '(071) 9151-1738', 'vicente.da.rosa@aluno.com', 'Antônio Carvalho', '748.593.102-41', 'Rua O, 339 - SP', 'Vicente888'),
('20230093', 'Maria Luiza Silveira', '273.015.496-52', '2015-03-08', '0900 921 1414', 'maria.luiza.silveira@aluno.com', 'Letícia Ferreira', '960.571.384-57', 'Rua O, 992 - SP', 'Maria335'),
('20230094', 'Dr. Pedro Miguel Oliveira', '604.519.823-98', '2013-11-27', '41 3750-4698', 'dr..pedro.miguel.oliveira@aluno.com', 'Ana Melo', '986.120.357-59', 'Rua B, 588 - SP', 'Dr.075'),
('20230095', 'Pedro Ferreira', '415.830.726-08', '2013-06-28', '(011) 8967 9983', 'pedro.ferreira@aluno.com', 'Alexandre Fogaça', '164.935.278-64', 'Rua T, 79 - SP', 'Pedro792'),
('20230096', 'Otávio Sales', '420.185.793-04', '2014-04-22', '(041) 5935 6213', 'otavio.sales@aluno.com', 'Dr. Leonardo da Luz', '568.324.071-90', 'Rua R, 923 - SP', 'Otávio584'),
('20230097', 'Caio Alves', '867.130.549-00', '2014-08-28', '+55 (041) 4481-8502', 'caio.alves@aluno.com', 'Bryan Mendes', '573.124.860-53', 'Rua M, 623 - SP', 'Caio587'),
('20230098', 'Juliana Alves', '109.257.638-02', '2014-06-12', '(031) 1189 4031', 'juliana.alves@aluno.com', 'Bárbara Pires', '297.851.360-86', 'Rua V, 907 - SP', 'Juliana015'),
('20230099', 'Isis Aragão', '194.053.872-60', '2013-11-13', '(061) 9885-2609', 'isis.aragao@aluno.com', 'Maria Dias', '458.376.219-46', 'Rua I, 341 - SP', 'Isis089'),
('20230100', 'Diego das Neves', '750.234.689-92', '2013-06-04', '+55 51 7823 6958', 'diego.das.neves@aluno.com', 'Arthur Rodrigues', '678.201.453-07', 'Rua J, 792 - SP', 'Diego480'),
('20230101', 'Rafael Carvalho', '896.421.073-50', '2014-07-15', '(081) 5039-4678', 'rafael.carvalho@aluno.com', 'Sra. Ana Clara Azevedo', '156.837.942-00', 'Rua U, 958 - SP', 'Rafael128'),
('20230102', 'Maria Clara Almeida', '647.135.829-64', '2014-05-18', '81 5469-2506', 'maria.clara.almeida@aluno.com', 'Laura Lima', '135.980.247-97', 'Rua B, 965 - SP', 'Maria044'),
('20230103', 'Ana Clara Castro', '203.518.796-68', '2013-10-05', '(021) 6748 0272', 'ana.clara.castro@aluno.com', 'Rafael Correia', '748.230.615-35', 'Rua T, 735 - SP', 'Ana068'),
('20230104', 'Benício Gonçalves', '374.819.056-57', '2013-06-21', '+55 31 5044 0009', 'benicio.goncalves@aluno.com', 'Davi Lucas da Cunha', '712.054.869-76', 'Rua L, 422 - SP', 'Benício044'),
('20230105', 'Srta. Maria Correia', '317.905.628-21', '2014-06-12', '+55 (041) 8125-6821', 'srta..maria.correia@aluno.com', 'Lívia Azevedo', '831.592.467-28', 'Rua D, 483 - SP', 'Srta.705'),
('20230106', 'Erick Carvalho', '265.798.403-74', '2013-05-20', '+55 (011) 4322-1772', 'erick.carvalho@aluno.com', 'Francisco Cunha', '025.678.149-49', 'Rua E, 646 - SP', 'Erick376'),
('20230107', 'Vitória Sales', '245.170.639-25', '2015-01-06', '+55 51 4685 0536', 'vitória.sales@aluno.com', 'Vitor Gabriel Peixoto', '842.706.519-11', 'Rua G, 393 - SP', 'Vitória771'),
('20230108', 'Yago Fogaça', '324.870.195-14', '2015-03-27', '0300 991 6404', 'yago.fogaca@aluno.com', 'Antônio da Cruz', '526.149.708-67', 'Rua B, 625 - SP', 'Yago769'),
('20230109', 'Maria Cecília Porto', '958.207.314-41', '2014-05-26', '+55 31 6903-9766', 'maria.cecilia.porto@aluno.com', 'Davi Lucas Pereira', '673.201.548-62', 'Rua U, 128 - SP', 'Maria972'),
('20230110', 'Davi Lucas Fernandes', '264.753.981-28', '2014-06-03', '(061) 1495-4446', 'davi.lucas.fernandes@aluno.com', 'Maitê Aragão', '783.926.041-13', 'Rua E, 982 - SP', 'Davi979'),
('20230111', 'Ana Júlia Freitas', '097.534.261-43', '2014-06-29', '(031) 8792-9095', 'ana.júlia.freitas@aluno.com', 'Henrique Pinto', '139.748.652-09', 'Rua V, 830 - SP', 'Ana189'),
('20230112', 'Olivia da Costa', '749.258.103-32', '2015-05-05', '31 4689-1428', 'olivia.da.costa@aluno.com', 'Danilo Campos', '530.789.624-74', 'Rua B, 801 - SP', 'Olivia331'),
('20230113', 'Pedro Lucas Rezende', '924.085.137-23', '2013-06-21', '(071) 1191 4495', 'pedro.lucas.rezende@aluno.com', 'Vitor Almeida', '768.510.392-30', 'Rua L, 809 - SP', 'Pedro699'),
('20230114', 'Natália Sales', '629.713.540-16', '2015-02-06', '+55 84 7554 7532', 'natalia.sales@aluno.com', 'Ana Mendes', '372.045.981-05', 'Rua B, 498 - SP', 'Natália205'),
('20230115', 'Bryan Lopes', '245.760.819-85', '2014-12-29', '(061) 4503 4228', 'bryan.lopes@aluno.com', 'Lucas Duarte', '184.506.327-90', 'Rua S, 586 - SP', 'Bryan827'),
('20230116', 'Letícia Rodrigues', '290.716.384-13', '2013-12-23', '+55 21 9913 4628', 'leticia.rodrigues@aluno.com', 'Pietra Fogaça', '526.819.034-24', 'Rua U, 799 - SP', 'Letícia555'),
('20230117', 'Sarah Ramos', '156.723.049-07', '2013-10-02', '11 3312-7615', 'sarah.ramos@aluno.com', 'Cauã Martins', '238.469.715-37', 'Rua D, 150 - SP', 'Sarah459'),
('20230118', 'Mirella Fogaça', '402.719.856-58', '2013-10-01', '+55 61 0788 8998', 'mirella.fogaca@aluno.com', 'Dra. Isis Peixoto', '593.271.064-07', 'Rua D, 426 - SP', 'Mirella041'),
('20230119', 'Alexandre Cardoso', '802.695.714-85', '2015-01-03', '+55 (084) 0325 6895', 'alexandre.cardoso@aluno.com', 'Cecília Novaes', '039.857.642-47', 'Rua A, 811 - SP', 'Alexandre460'),
('20230120', 'Nathan Costela', '548.632.917-28', '2015-02-06', '+55 81 8478-5656', 'nathan.costela@aluno.com', 'Samuel Alves', '374.961.850-00', 'Rua K, 740 - SP', 'Nathan231'),
('20230121', 'Pedro Henrique da Mota', '142.893.056-60', '2014-04-21', '+55 (061) 1080-1192', 'pedro.henrique.da.mota@aluno.com', 'Miguel da Rocha', '591.038.746-48', 'Rua X, 31 - SP', 'Pedro318'),
('20230122', 'Clarice Pires', '941.730.628-69', '2013-10-04', '+55 81 4527-5811', 'clarice.pires@aluno.com', 'Alana Caldeira', '356.129.074-43', 'Rua H, 839 - SP', 'Clarice351'),
('20230123', 'Maria Sales', '436.750.219-80', '2013-07-27', '84 4709-2289', 'maria.sales@aluno.com', 'Dr. Ryan Campos', '647.203.518-08', 'Rua A, 210 - SP', 'Maria679'),
('20230124', 'Heitor Melo', '427.630.891-78', '2015-02-05', '+55 (041) 4292 1687', 'heitor.melo@aluno.com', 'Melissa Cunha', '652.847.109-67', 'Rua Y, 8 - SP', 'Heitor269'),
('20230125', 'Carlos Eduardo da Paz', '730.682.415-53', '2014-04-28', '41 0476-3708', 'carlos.eduardo.da.paz@aluno.com', 'Sabrina Novaes', '539.217.608-95', 'Rua H, 880 - SP', 'Carlos144'),
('20230126', 'Dr. Davi Lucas Jesus', '426.057.138-90', '2013-07-18', '+55 11 9381 3578', 'dr..davi.lucas.jesus@aluno.com', 'Dra. Vitória Castro', '290.638.147-04', 'Rua X, 983 - SP', 'Dr.202'),
('20230127', 'Ana Julia Aragão', '032.851.769-03', '2013-09-12', '31 8095 4839', 'ana.julia.aragao@aluno.com', 'André Oliveira', '519.260.734-52', 'Rua K, 485 - SP', 'Ana928'),
('20230128', 'Sr. Thiago Alves', '960.318.457-84', '2013-10-02', '0500 781 0012', 'sr..thiago.alves@aluno.com', 'Joana da Luz', '381.069.475-48', 'Rua R, 652 - SP', 'Sr.350'),
('20230129', 'Alice Lopes', '683.429.150-42', '2014-04-06', '11 8035-7293', 'alice.lopes@aluno.com', 'Arthur da Paz', '145.276.903-61', 'Rua R, 595 - SP', 'Alice331'),
('20230130', 'Benício Nascimento', '172.639.540-52', '2014-07-28', '(031) 9509-8338', 'benicio.nascimento@aluno.com', 'Luiza das Neves', '918.762.053-77', 'Rua E, 824 - SP', 'Benício252'),
('20230131', 'Pedro Henrique Souza', '926.807.154-11', '2014-11-25', '(031) 9460-3943', 'pedro.henrique.souza@aluno.com', 'Sr. Ryan Fogaça', '754.026.819-02', 'Rua F, 299 - SP', 'Pedro368'),
('20230132', 'Sr. Erick da Paz', '361.427.580-90', '2015-03-31', '61 0861-4384', 'sr..erick.da.paz@aluno.com', 'Srta. Ana Lívia Santos', '685.190.237-03', 'Rua T, 22 - SP', 'Sr.371'),
('20230133', 'Luigi Gonçalves', '389.071.245-23', '2015-05-12', '(061) 1275 8217', 'luigi.goncalves@aluno.com', 'Stella Rocha', '547.120.398-41', 'Rua J, 564 - SP', 'Luigi495'),
('20230134', 'Maria Sophia da Luz', '196.820.357-59', '2014-07-13', '+55 (041) 9066 8533', 'maria.sophia.da.luz@aluno.com', 'Pietro Cavalcanti', '182.763.940-78', 'Rua J, 653 - SP', 'Maria326'),
('20230135', 'Maria Vitória da Mata', '520.817.634-35', '2013-08-06', '84 1789-7459', 'maria.vitória.da.mata@aluno.com', 'Emanuel Barbosa', '645.182.730-44', 'Rua U, 972 - SP', 'Maria530'),
('20230136', 'Yasmin Costela', '017.526.489-94', '2014-02-09', '(061) 3555 6306', 'yasmin.costela@aluno.com', 'Maria Luiza Teixeira', '460.972.513-43', 'Rua Y, 923 - SP', 'Yasmin322'),
('20230137', 'Cauê Barros', '843.652.190-06', '2015-01-02', '+55 21 6540-1746', 'caue.barros@aluno.com', 'Davi Lucca Porto', '029.147.563-99', 'Rua P, 94 - SP', 'Cauê972'),
('20230138', 'Clarice das Neves', '748.926.531-28', '2015-05-08', '0800-803-2331', 'clarice.das.neves@aluno.com', 'Calebe Barbosa', '981.456.372-28', 'Rua R, 621 - SP', 'Clarice674'),
('20230139', 'Alana Souza', '583.142.976-82', '2014-08-24', '41 0799-3648', 'alana.souza@aluno.com', 'Gabriela Costa', '548.360.217-07', 'Rua M, 190 - SP', 'Alana742'),
('20230140', 'Sra. Heloísa Almeida', '159.476.032-25', '2014-01-14', '(061) 1807-3484', 'sra..heloisa.almeida@aluno.com', 'Eduardo Nunes', '978.260.541-76', 'Rua O, 349 - SP', 'Sra.914'),
('20230141', 'Srta. Brenda Nogueira', '745.281.963-28', '2014-05-16', '+55 71 7112-8045', 'srta..brenda.nogueira@aluno.com', 'Dr. Benício Nogueira', '524.307.816-62', 'Rua U, 89 - SP', 'Srta.420'),
('20230142', 'Marina Lopes', '150.634.982-05', '2014-11-09', '+55 71 7072-3531', 'marina.lopes@aluno.com', 'Ana Beatriz Nascimento', '760.295.314-25', 'Rua X, 460 - SP', 'Marina602'),
('20230143', 'Srta. Letícia Cavalcanti', '680.271.534-17', '2014-04-12', '51 9415 7954', 'srta..leticia.cavalcanti@aluno.com', 'Sr. Benjamin Silveira', '370.592.846-56', 'Rua Z, 645 - SP', 'Srta.364'),
('20230144', 'Dra. Ana Sophia Farias', '085.176.324-35', '2014-04-20', '+55 (061) 7420-5454', 'dra..ana.sophia.farias@aluno.com', 'João Vitor Almeida', '012.476.895-49', 'Rua Z, 483 - SP', 'Dra.049'),
('20230145', 'Bruna da Costa', '128.493.605-89', '2013-12-28', '(084) 9039 0555', 'bruna.da.costa@aluno.com', 'Murilo Moura', '516.824.903-51', 'Rua R, 781 - SP', 'Bruna460'),
('20230146', 'Carolina Cunha', '815.467.023-26', '2014-02-20', '+55 61 7472-6651', 'carolina.cunha@aluno.com', 'Sr. Francisco da Luz', '571.269.408-58', 'Rua I, 905 - SP', 'Carolina603'),
('20230147', 'Eduardo da Cruz', '976.541.083-20', '2013-06-11', '(031) 6910-6493', 'eduardo.da.cruz@aluno.com', 'Agatha Dias', '678.435.901-10', 'Rua S, 728 - SP', 'Eduardo312'),
('20230148', 'Davi Luiz Martins', '187.943.620-50', '2013-12-03', '+55 (031) 7575 8349', 'davi.luiz.martins@aluno.com', 'Luigi Cunha', '435.029.876-29', 'Rua J, 893 - SP', 'Davi795'),
('20230149', 'Enzo Gabriel Nogueira', '243.617.859-37', '2014-09-06', '+55 84 0966 5424', 'enzo.gabriel.nogueira@aluno.com', 'Emanuella Novaes', '937.615.840-75', 'Rua B, 73 - SP', 'Enzo733'),
('20230150', 'Dra. Júlia da Paz', '846.025.179-94', '2014-01-12', '+55 81 2539 9201', 'dra..júlia.da.paz@aluno.com', 'Fernando Gomes', '420.896.715-30', 'Rua Q, 881 - SP', 'Dra.291'),
('20230151', 'Dr. Calebe Caldeira', '056.432.198-24', '2014-04-11', '+55 21 9485 2002', 'dr..calebe.caldeira@aluno.com', 'Isabelly Araújo', '596.480.723-29', 'Rua N, 882 - SP', 'Dr.255'),
('20230152', 'Igor Nunes', '201.859.736-12', '2014-04-03', '+55 (084) 5112-4323', 'igor.nunes@aluno.com', 'Larissa da Paz', '304.951.827-88', 'Rua U, 216 - SP', 'Igor546'),
('20230153', 'Helena Fernandes', '837.416.029-22', '2013-12-11', '(021) 1015-5194', 'helena.fernandes@aluno.com', 'Erick Jesus', '918.367.205-21', 'Rua M, 760 - SP', 'Helena772'),
('20230154', 'Daniel Barbosa', '907.345.168-00', '2013-11-03', '0900-152-4177', 'daniel.barbosa@aluno.com', 'Pietro Ribeiro', '473.681.925-19', 'Rua L, 582 - SP', 'Daniel616'),
('20230155', 'Dr. Francisco Nogueira', '297.014.835-88', '2013-05-24', '(041) 7363 4950', 'dr..francisco.nogueira@aluno.com', 'Sr. Kevin Araújo', '980.576.321-86', 'Rua M, 411 - SP', 'Dr.516'),
('20230156', 'Helena Araújo', '861.320.549-60', '2014-02-14', '+55 71 9081 9803', 'helena.araújo@aluno.com', 'Maria Luiza Oliveira', '418.706.953-48', 'Rua L, 648 - SP', 'Helena444'),
('20230157', 'Emanuella Nunes', '307.681.492-31', '2013-07-09', '+55 51 3126 7649', 'emanuella.nunes@aluno.com', 'Marcos Vinicius Azevedo', '862.534.109-89', 'Rua X, 514 - SP', 'Emanuella360'),
('20230158', 'Maria Luiza Rocha', '765.894.103-48', '2015-03-18', '61 8354-3864', 'maria.luiza.rocha@aluno.com', 'Yuri Nascimento', '593.602.487-38', 'Rua J, 147 - SP', 'Maria706'),
('20230159', 'Juan Teixeira', '253.761.984-64', '2014-03-19', '+55 (084) 9771 2184', 'juan.teixeira@aluno.com', 'André Nogueira', '630.417.852-26', 'Rua A, 364 - SP', 'Juan480'),
('20230160', 'Yasmin Nascimento', '047.586.932-00', '2013-09-13', '0800-832-5628', 'yasmin.nascimento@aluno.com', 'Vitor Gabriel Rodrigues', '314.876.502-80', 'Rua Q, 69 - SP', 'Yasmin609'),
('20230161', 'Srta. Laura Freitas', '480.369.172-03', '2014-10-08', '+55 (021) 8651 5078', 'srta..laura.freitas@aluno.com', 'Francisco Nascimento', '067.315.928-03', 'Rua V, 405 - SP', 'Srta.006'),
('20230162', 'Clara Nunes', '543.980.271-14', '2015-04-15', '+55 31 9921 7075', 'clara.nunes@aluno.com', 'Leandro da Luz', '082.613.549-89', 'Rua I, 895 - SP', 'Clara629'),
('20230163', 'Enzo Araújo', '954.387.216-37', '2014-03-05', '+55 81 1781 1225', 'enzo.araújo@aluno.com', 'Clara Teixeira', '458.290.761-01', 'Rua E, 770 - SP', 'Enzo514'),
('20230164', 'Ana Sophia Peixoto', '718.539.620-40', '2014-04-01', '84 0564-4219', 'ana.sophia.peixoto@aluno.com', 'Maria Cecília Lopes', '930.618.472-78', 'Rua X, 339 - SP', 'Ana336'),
('20230165', 'Srta. Esther da Rocha', '405.762.389-29', '2013-10-15', '0900-437-4006', 'srta..esther.da.rocha@aluno.com', 'Maria Clara Alves', '215.389.647-91', 'Rua V, 446 - SP', 'Srta.191'),
('20230166', 'Brenda Carvalho', '530.862.479-83', '2014-08-03', '0900 907 3342', 'brenda.carvalho@aluno.com', 'Levi Dias', '013.765.948-20', 'Rua K, 133 - SP', 'Brenda213');


-- Vincular alunos do 1ºA (RA 20230001 a 20230030) à turma_id 1
INSERT INTO Aluno_turmas (id, aluno_RA, turma_id) VALUES
(1, '20230001', 1),
(2, '20230002', 1),
(3, '20230003', 1),
(4, '20230004', 1),
(5, '20230005', 1),
(6, '20230006', 1),
(7, '20230007', 1),
(8, '20230008', 1),
(9, '20230009', 1),
(10, '20230010', 1),
(11, '20230011', 1),
(12, '20230012', 1),
(13, '20230013', 1),
(14, '20230014', 1),
(15, '20230015', 1),
(16, '20230016', 1),
(17, '20230017', 1),
(18, '20230018', 1),
(19, '20230019', 1),
(20, '20230020', 1),
(21, '20230021', 1),
(22, '20230022', 1),
(23, '20230023', 1),
(24, '20230024', 1),
(25, '20230025', 1),
(26, '20230026', 1),
(27, '20230027', 1),
(28, '20230028', 1),
(29, '20230029', 1),
(30, '20230030', 1);

-- Vincular alunos do 1ºB (RA 20230031 a 20230058) à turma_id 2
INSERT INTO Aluno_turmas (id, aluno_RA, turma_id) VALUES
(31, '20230031', 2),
(32, '20230032', 2),
(33, '20230033', 2),
(34, '20230034', 2),
(35, '20230035', 2),
(36, '20230036', 2),
(37, '20230037', 2),
(38, '20230038', 2),
(39, '20230039', 2),
(40, '20230040', 2),
(41, '20230041', 2),
(42, '20230042', 2),
(43, '20230043', 2),
(44, '20230044', 2),
(45, '20230045', 2),
(46, '20230046', 2),
(47, '20230047', 2),
(48, '20230048', 2),
(49, '20230049', 2),
(50, '20230050', 2),
(51, '20230051', 2),
(52, '20230052', 2),
(53, '20230053', 2),
(54, '20230054', 2),
(55, '20230055', 2),
(56, '20230056', 2),
(57, '20230057', 2),
(58, '20230058', 2);

-- Vincular alunos do 2ºA (RA 20230059 a 20230088) à turma_id 3
INSERT INTO Aluno_turmas (id, aluno_RA, turma_id) VALUES
(59, '20230059', 3),
(60, '20230060', 3),
(61, '20230061', 3),
(62, '20230062', 3),
(63, '20230063', 3),
(64, '20230064', 3),
(65, '20230065', 3),
(66, '20230066', 3),
(67, '20230067', 3),
(68, '20230068', 3),
(69, '20230069', 3),
(70, '20230070', 3),
(71, '20230071', 3),
(72, '20230072', 3),
(73, '20230073', 3),
(74, '20230074', 3),
(75, '20230075', 3),
(76, '20230076', 3),
(77, '20230077', 3),
(78, '20230078', 3),
(79, '20230079', 3),
(80, '20230080', 3),
(81, '20230081', 3),
(82, '20230082', 3),
(83, '20230083', 3),
(84, '20230084', 3),
(85, '20230085', 3),
(86, '20230086', 3),
(87, '20230087', 3),
(88, '20230088', 3);

-- Vincular alunos do 2ºB (RA 20230089 a 20230111) à turma_id 4
INSERT INTO Aluno_turmas (id, aluno_RA, turma_id) VALUES
(89, '20230089', 4),
(90, '20230090', 4),
(91, '20230091', 4),
(92, '20230092', 4),
(93, '20230093', 4),
(94, '20230094', 4),
(95, '20230095', 4),
(96, '20230096', 4),
(97, '20230097', 4),
(98, '20230098', 4),
(99, '20230099', 4),
(100, '20230100', 4),
(101, '20230101', 4),
(102, '20230102', 4),
(103, '20230103', 4),
(104, '20230104', 4),
(105, '20230105', 4),
(106, '20230106', 4),
(107, '20230107', 4),
(108, '20230108', 4),
(109, '20230109', 4),
(110, '20230110', 4),
(111, '20230111', 4);

-- Vincular alunos do 3ºA (RA 20230112 a 20230141) à turma_id 5
INSERT INTO Aluno_turmas (id, aluno_RA, turma_id) VALUES
(112, '20230112', 5),
(113, '20230113', 5),
(114, '20230114', 5),
(115, '20230115', 5),
(116, '20230116', 5),
(117, '20230117', 5),
(118, '20230118', 5),
(119, '20230119', 5),
(120, '20230120', 5),
(121, '20230121', 5),
(122, '20230122', 5),
(123, '20230123', 5),
(124, '20230124', 5),
(125, '20230125', 5),
(126, '20230126', 5),
(127, '20230127', 5),
(128, '20230128', 5),
(129, '20230129', 5),
(130, '20230130', 5),
(131, '20230131', 5),
(132, '20230132', 5),
(133, '20230133', 5),
(134, '20230134', 5),
(135, '20230135', 5),
(136, '20230136', 5),
(137, '20230137', 5),
(138, '20230138', 5),
(139, '20230139', 5),
(140, '20230140', 5),
(141, '20230141', 5);

-- Vincular alunos do 3ºB (RA 20230142 a 20230166) à turma_id 6
INSERT INTO Aluno_turmas (id, aluno_RA, turma_id) VALUES
(142, '20230142', 6),
(143, '20230143', 6),
(144, '20230144', 6),
(145, '20230145', 6),
(146, '20230146', 6),
(147, '20230147', 6),
(148, '20230148', 6),
(149, '20230149', 6),
(150, '20230150', 6),
(151, '20230151', 6),
(152, '20230152', 6),
(153, '20230153', 6),
(154, '20230154', 6),
(155, '20230155', 6),
(156, '20230156', 6),
(157, '20230157', 6),
(158, '20230158', 6),
(159, '20230159', 6),
(160, '20230160', 6),
(161, '20230161', 6),
(162, '20230162', 6),
(163, '20230163', 6),
(164, '20230164', 6),
(165, '20230165', 6),
(166, '20230166', 6);


-- Inserindo associações de professores, turmas e disciplinas

-- Turma 1ºA (turma_id = 1)
INSERT INTO Professor_turmas_disciplinas (id, professor_id, turma_id, disciplina_id) VALUES
(1, 1, 1, 1),  -- Maria Silva ensina Matemática para 1ºA
(2, 2, 1, 2),  -- João Santos ensina Português para 1ºA
(3, 3, 1, 3),  -- Ana Oliveira ensina História para 1ºA
(4, 4, 1, 4),  -- Carlos Pereira ensina Geografia para 1ºA
(5, 5, 1, 5),  -- Fernanda Costa ensina Física para 1ºA
(6, 6, 1, 7),  -- Rafael Lima ensina Biologia para 1ºA
(7, 7, 1, 8),  -- Patrícia Rocha ensina Inglês para 1ºA
(8, 8, 1, 9),  -- Eduardo Almeida ensina Educação Física para 1ºA
(9, 9, 1, 10), -- Juliana Teixeira ensina Filosofia para 1ºA
(10, 10, 1, 11); -- Ricardo Nunes ensina Sociologia para 1ºA

-- Turma 1ºB (turma_id = 2)
INSERT INTO Professor_turmas_disciplinas (id, professor_id, turma_id, disciplina_id) VALUES
(11, 1, 2, 1),   -- Maria Silva ensina Matemática para 1ºB
(12, 2, 2, 2),   -- João Santos ensina Português para 1ºB
(13, 3, 2, 3),   -- Ana Oliveira ensina História para 1ºB
(14, 4, 2, 4),   -- Carlos Pereira ensina Geografia para 1ºB
(15, 5, 2, 6),   -- Fernanda Costa ensina Química para 1ºB
(16, 6, 2, 7),   -- Rafael Lima ensina Biologia para 1ºB
(17, 7, 2, 8),   -- Patrícia Rocha ensina Inglês para 1ºB
(18, 8, 2, 9),   -- Eduardo Almeida ensina Educação Física para 1ºB
(19, 9, 2, 10),  -- Juliana Teixeira ensina Filosofia para 1ºB
(20, 10, 2, 12); -- Ricardo Nunes ensina Artes para 1ºB

-- Turma 2ºA (turma_id = 3)
INSERT INTO Professor_turmas_disciplinas (id, professor_id, turma_id, disciplina_id) VALUES
(21, 1, 3, 1),   -- Maria Silva ensina Matemática para 2ºA
(22, 2, 3, 2),   -- João Santos ensina Português para 2ºA
(23, 3, 3, 3),   -- Ana Oliveira ensina História para 2ºA
(24, 4, 3, 4),   -- Carlos Pereira ensina Geografia para 2ºA
(25, 5, 3, 5),   -- Fernanda Costa ensina Física para 2ºA
(26, 6, 3, 6),   -- Rafael Lima ensina Química para 2ºA
(27, 7, 3, 8),   -- Patrícia Rocha ensina Inglês para 2ºA
(28, 8, 3, 9),   -- Eduardo Almeida ensina Educação Física para 2ºA
(29, 9, 3, 10),  -- Juliana Teixeira ensina Filosofia para 2ºA
(30, 10, 3, 11); -- Ricardo Nunes ensina Sociologia para 2ºA

-- Turma 2ºB (turma_id = 4)
INSERT INTO Professor_turmas_disciplinas (id, professor_id, turma_id, disciplina_id) VALUES
(31, 1, 4, 1),   -- Maria Silva ensina Matemática para 2ºB
(32, 2, 4, 2),   -- João Santos ensina Português para 2ºB
(33, 3, 4, 3),   -- Ana Oliveira ensina História para 2ºB
(34, 4, 4, 4),   -- Carlos Pereira ensina Geografia para 2ºB
(35, 5, 4, 5),   -- Fernanda Costa ensina Física para 2ºB
(36, 6, 4, 7),   -- Rafael Lima ensina Biologia para 2ºB
(37, 7, 4, 8),   -- Patrícia Rocha ensina Inglês para 2ºB
(38, 8, 4, 9),   -- Eduardo Almeida ensina Educação Física para 2ºB
(39, 9, 4, 10),  -- Juliana Teixeira ensina Filosofia para 2ºB
(40, 10, 4, 12); -- Ricardo Nunes ensina Artes para 2ºB

-- Turma 3ºA (turma_id = 5)
INSERT INTO Professor_turmas_disciplinas (id, professor_id, turma_id, disciplina_id) VALUES
(41, 1, 5, 1),   -- Maria Silva ensina Matemática para 3ºA
(42, 2, 5, 2),   -- João Santos ensina Português para 3ºA
(43, 3, 5, 3),   -- Ana Oliveira ensina História para 3ºA
(44, 4, 5, 4),   -- Carlos Pereira ensina Geografia para 3ºA
(45, 5, 5, 5),   -- Fernanda Costa ensina Física para 3ºA
(46, 6, 5, 6),   -- Rafael Lima ensina Química para 3ºA
(47, 7, 5, 8),   -- Patrícia Rocha ensina Inglês para 3ºA
(48, 8, 5, 9),   -- Eduardo Almeida ensina Educação Física para 3ºA
(49, 9, 5, 11),  -- Juliana Teixeira ensina Sociologia para 3ºA
(50, 10, 5, 12); -- Ricardo Nunes ensina Artes para 3ºA

-- Turma 3ºB (turma_id = 6)
INSERT INTO Professor_turmas_disciplinas (id, professor_id, turma_id, disciplina_id) VALUES
(51, 1, 6, 1),   -- Maria Silva ensina Matemática para 3ºB
(52, 2, 6, 2),   -- João Santos ensina Português para 3ºB
(53, 3, 6, 3),   -- Ana Oliveira ensina História para 3ºB
(54, 4, 6, 4),   -- Carlos Pereira ensina Geografia para 3ºB
(55, 5, 6, 5),   -- Fernanda Costa ensina Física para 3ºB
(56, 6, 6, 7),   -- Rafael Lima ensina Biologia para 3ºB
(57, 7, 6, 8),   -- Patrícia Rocha ensina Inglês para 3ºB
(58, 8, 6, 9),   -- Eduardo Almeida ensina Educação Física para 3ºB
(59, 9, 6, 10),  -- Juliana Teixeira ensina Filosofia para 3ºB
(60, 10, 6, 11); -- Ricardo Nunes ensina Sociologia para 3ºB