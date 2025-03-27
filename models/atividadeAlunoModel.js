const Database = require('../utils/database');

class AtividadeAlunoModel {
    #atividadeAluno_id;
    #aluno_RA;
    #atividadeAluno_notaAluno;
    #atividadeAluno_feedbackProf;
    #atividadeAluno_prazoEntrega;
    #atividadeProf_idProf;
    #disciplina_id;

    // Getters e Setters
    get atividadeAluno_id() { return this.#atividadeAluno_id } set atividadeAluno_id(value) { this.#atividadeAluno_id = value }
    get aluno_RA() { return this.#aluno_RA } set aluno_RA(value) { this.#aluno_RA = value }
    get atividadeAluno_notaAluno() { return this.#atividadeAluno_notaAluno } set atividadeAluno_notaAluno(value) { this.#atividadeAluno_notaAluno = value }
    get atividadeAluno_feedbackProf() { return this.#atividadeAluno_feedbackProf } set atividadeAluno_feedbackProf(value) { this.#atividadeAluno_feedbackProf = value }
    get atividadeAluno_prazoEntrega() { return this.#atividadeAluno_prazoEntrega } set atividadeAluno_prazoEntrega(value) { this.#atividadeAluno_prazoEntrega = value }
    get atividadeProf_idProf() { return this.#atividadeProf_idProf } set atividadeProf_idProf(value) { this.#atividadeProf_idProf = value }
    get disciplina_id() { return this.#disciplina_id } set disciplina_id(value) { this.#disciplina_id = value }

    constructor(atividadeAluno_id, aluno_RA, atividadeAluno_notaAluno, atividadeAluno_feedbackProf,
        atividadeAluno_prazoEntrega, atividadeProf_idProf, disciplina_id) {
        this.atividadeAluno_id = atividadeAluno_id;
        this.aluno_RA = aluno_RA;
        this.atividadeAluno_notaAluno = atividadeAluno_notaAluno;
        this.atividadeAluno_feedbackProf = atividadeAluno_feedbackProf;
        this.atividadeAluno_prazoEntrega = atividadeAluno_prazoEntrega;
        this.atividadeProf_idProf = atividadeProf_idProf;
        this.disciplina_id = disciplina_id;
    }

   /*async listarAtividadeAlunoDisciplina(aluno_RA) {
        const sql = `
            SELECT * FROM AtividadeAluno JOIN Disciplinas ON AtividadeAluno.disciplina_id = Disciplinas.disciplina_id  WHERE AtividadeAluno.aluno_RA = ?
        `;
        
        
        const banco = new Database();
        const rows = await banco.ExecutaComando(sql, [aluno_RA]);
        
        let lista = [];
        for(let i = 0; i < rows.length; i++) {
            lista.push({
                atividadeAluno_id: rows[i].atividadeAluno_id,
                aluno_RA: rows[i].aluno_RA,
                atividadeAluno_notaAluno: rows[i].atividadeAluno_notaAluno,
                atividadeAluno_feedbackProf: rows[i].atividadeAluno_feedbackProf,
                atividadeAluno_prazoEntrega: rows[i].atividadeAluno_prazoEntrega,
                atividadeProf_idProf: rows[i].atividadeProf_idProf,
                disciplina_id: rows[i].disciplina_id,
                disciplina_nome: rows[i].disciplina_nome
            });
            
        }
        return lista;
    }*/

        async listarAtividades(aluno_RA) {
            const sql = `
                SELECT *
                FROM AtividadeAluno
                WHERE aluno_RA = ?
            `;
            
            const banco = new Database();
            const rows = await banco.ExecutaComando(sql, [aluno_RA]);
            
            let atividades = [];
            for (let i = 0; i < rows.length; i++) {
                atividades.push({
                    atividadeAluno_id: rows[i].atividadeAluno_id,
                    atividadeAluno_notaAluno: rows[i].atividadeAluno_notaAluno,
                    atividadeAluno_feedbackProf: rows[i].atividadeAluno_feedbackProf,
                    atividadeAluno_prazoEntrega: rows[i].atividadeAluno_prazoEntrega,
                    disciplina_id: rows[i].disciplina_id
                });
            }
            return atividades;
        }
    }
 

   
module.exports = AtividadeAlunoModel;