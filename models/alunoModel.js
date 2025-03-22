const Database = require('../utils/database');

class AlunoModel {
  constructor() {}

  async listar() {
    let sql = 'SELECT * FROM Alunos';
    let banco = new Database();
    let lista = [];
    let rows = await banco.ExecutaComando(sql);
    for (let i = 0; i < rows.length; i++) {
      // falta desenvolver
    }
    return lista;
  }
}

module.exports = AlunoModel;
