const mysql = require('mysql2');

class Database {
  #conexao;

  get conexao() {
    return this.#conexao;
  }

  set conexao(conexao) {
    this.#conexao = conexao;
  }

  // constructor() {
  //   this.#conexao = mysql.createPool({
  //     host: '132.226.245.178',
  //     database: 'PFS1_10442428760',
  //     user: '10442428760',
  //     password: '10442428760',
  //   });
  // }

  // Banco alternativo
  constructor() {
    this.#conexao = mysql.createPool({
      host: 'shortline.proxy.rlwy.net',
      database: 'railway',
      user: 'root',
      password: 'cuxcTanKssRwpydXOcXHujskAgaRSlKj',
      port:42145
    });
  }

  ExecutaComando(sql, valores) {      //para fazer select
    var cnn = this.#conexao;
    return new Promise(function (res, rej) {
      cnn.query(sql, valores, function (error, results, fields) {
        if (error) rej(error);
        else res(results);
      });
    });
  }

  ExecutaComandoNonQuery(sql, valores) {      //insert, update e delete
    var cnn = this.#conexao;
    return new Promise(function (res, rej) {
      cnn.query(sql, valores, function (error, results, fields) {
        if (error) rej(error);
        else res(results.affectedRows > 0);
      });
    });
  }
}

module.exports = Database;
