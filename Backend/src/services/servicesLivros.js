const validacaoLivro = require("../models/validacaoLivros")
const persistanceLivro = require("../persistance/persistanceLivros")

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
>>>>>>> Stashed changes
async function cadastro(livro){
  const { error, value } = validacaoLivro.validate(livro, { abortEarly: false }) //Valida os dados
  if (error) {
    throw error
  }
  const dados = await persistanceLivro.verificaSeLivroJaExiste(value.titulo)
  if(dados[0]) {
    throw new Error("Esse livro ja existe")
  }
  await persistanceLivro.cadastro(value.titulo,value.autor,value.editora,value.genero)
  return value
}

async function listarTodos() {
  return persistanceLivro.listagem()
}

async function listagemUnica(id) {
   return await persistanceLivro.listagemUnica(id) 
}

async function editar(id,novoLivro) {
  livroAntigo = await persistanceLivro.listagemUnica(id);
    if(!livroAntigo[0]) {
      throw Error("Id do livro nao encontrado")
    }
  
  novoLivro = verificaDiferencas(novoLivro,livroAntigo[0])
  
  const { error, value } = validacaoLivro.validate(novoLivro, { abortEarly: false });
    if (error) {
      throw error
    }
  dados = [value.titulo,value.autor,value.editora,value.genero,id]
  
  await persistanceLivro.editar(dados)
}

async function deletar(id) {
  livro = await persistanceLivro.listagemUnica(id)
    if(!livro[0]) {
      throw new Error("Id do livro nao encontrado")
    }
  await persistanceLivro.deletar(id)
}

function verificaDiferencas(livroNovo,livroAntigo) {
  
  
  if(livroNovo.titulo) {livroAntigo.titulo = livroNovo.titulo}
  if(livroNovo.autor) {livroAntigo.autor = livroNovo.autor}
  if(livroNovo.editora) {livroAntigo.editora = livroNovo.editora}
  if(livroNovo.genero) {livroAntigo.genero = livroNovo.genero}

  return livroAntigo
}

<<<<<<< Updated upstream
module.exports = {cadastro,listarTodos,listagemUnica,editar,deletar}
=======
module.exports = {cadastro,listarTodos,listagemUnica,editar,deletar}
=======
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
>>>>>>> d0967f0935b323c4c135d7bd9c2270d05f60434d
>>>>>>> Stashed changes
