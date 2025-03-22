const Database = require('../utils/database');

class ProfessorModel {
  constructor() {}

  async listar() {
    let sql = 'SELECT * FROM Professores';
    let banco = new Database();
    let lista = [];
    let rows = await banco.ExecutaComando(sql);
    for (let i = 0; i < rows.length; i++) {
      // falta desenvolver
    }
    return lista;
  }
}

module.exports = ProfessorModel;
