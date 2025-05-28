const Database = require('../utils/database');

class ItensQuadroNotasModel {
    #id;
    #quadro;
    #atividade_id;
    #descricao;
    #peso;
    #tipo;

    get id() { return this.#id }
    set id(value) { this.#id = value }

    get quadro() { return this.#quadro }
    set quadro(value) { this.#quadro = value }

    get atividade_id() { return this.#atividade_id }
    set atividade_id(value) { this.#atividade_id = value }

    get descricao() { return this.#descricao }
    set descricao(value) { this.#descricao = value }

    get peso() { return this.#peso }
    set peso(value) { this.#peso = value }

    get tipo() { return this.#tipo }
    set tipo(value) { this.#tipo = value }

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
        if (!this.#id || this.#id === 0) {
            const sql = `
                                                INSERT INTO ItensQuadroNotas (quadro_id, atividade_id, descricao, peso, tipo)
                                                VALUES (?, ?, ?, ?, ?)
                                            `;
            const valores = [
                this.#quadro,
                this.#atividade_id,
                this.#descricao,
                this.#peso,
                this.#tipo
            ];
            const resultado = await banco.ExecutaComando(sql, valores);
            return resultado;
        } else {
            const sql = `
                                                UPDATE ItensQuadroNotas
                                                SET quadro_id = ?, atividade_id = ?, descricao = ?, peso = ?, tipo = ?
                                                WHERE id = ?
                                            `;
            const valores = [
                this.#quadro,
                this.#atividade_id,
                this.#descricao,
                this.#peso,
                this.#tipo,
                this.#id
            ];
            const resultado = await banco.ExecutaComando(sql, valores);
            return resultado;
        }
    }

   

    async listarPorQuadro(quadroId) {
        const banco = new Database();
        const sql = `SELECT * FROM ItensQuadroNotas WHERE quadro_id = ?`;
        const valores = [quadroId];
        const rows = await banco.ExecutaComando(sql, valores);

        const lista = [];
        for (let i = 0; i < rows.length; i++) {
            lista.push(new ItensQuadroNotasModel(
                rows[i]['id'],
                rows[i]['quadro_id'],
                rows[i]['atividade_id'],
                rows[i]['descricao'],
                rows[i]['peso'],
                rows[i]['tipo']
            ));
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
