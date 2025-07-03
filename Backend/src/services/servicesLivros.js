const db = require("../db");

async function cadastro(titulo, editora, autor, genero) {
  return new Promise((aceito, rejeitado) => {
    const query =
      "INSERT INTO libonline.livro (titulo,autor, genero, editora) VALUES(?,?,?,?);";
    const valores = [titulo, editora, autor, genero];

    db.query(query, valores, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

async function listagem() {
  return new Promise((aceito, rejeitado) => {
    const query = "SELECT * FROM libonline.livro";
    db.query(query, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

async function listagemUnica(id) {
  return new Promise((aceito, rejeitado) => {
    const query =
      "SELECT titulo,autor,editora,genero FROM libonline.livro WHERE id=?";
    db.query(query, id, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

async function editar(dados) {
  return new Promise((aceito, rejeitado) => {
    const query =
      "UPDATE libonline.livro SET titulo=?, autor=?, genero=?, editora=? WHERE id=?;";
    db.query(query, dados, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

async function deletar(id) {
  return new Promise((aceito, rejeitado) => {
    const query = "DELETE FROM libonline.livro WHERE id=?;";
    db.query(query, id, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

module.exports = { cadastro, listagem, listagemUnica, editar, deletar };
