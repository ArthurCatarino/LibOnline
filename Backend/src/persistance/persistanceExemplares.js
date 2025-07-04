const db = require("../db")

async function criar(id,registro) {
  return new Promise((aceito,rejeitado)=>{
    const query = "INSERT INTO libonline.exemplar (idLivro, numeroRegistro, tipo) VALUES(?,?, 'disponivel');"
    const dados = [id,registro]
    db.query(query,dados,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
    })
  })
}

async function verificaSeOLivroExiste(id) {
  return new Promise((aceito,rejeitado)=>{
    const query = "SELECT titulo, id, autor, genero, editora FROM libonline.livro WHERE id=?;"
    db.query(query,id,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
    })
  })
}

async function listar() {
  return new Promise ((aceito,rejeitado)=>{
    const query = "SELECT * FROM libonline.exemplar;"
    db.query(query,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
    })
  })
}

async function editar(idExemplar,idLivro,numeroRegistro,tipo) {
  return new Promise ((aceito,rejeitado)=>{
    const dados = [idLivro,numeroRegistro,tipo,idExemplar]
    console.log(dados)
    const query = "UPDATE libonline.exemplar SET idLivro=?, numeroRegistro=?, tipo=? WHERE idExemplar=?;"
    db.query(query,dados,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
    })
  })
}

async function listaExemplarUnico(id) {
  return new Promise ((aceito,rejeitado)=>{
    const query = "SELECT * FROM libonline.exemplar WHERE idExemplar=?;"
    db.query(query,id,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
    })
  })
}

async function deletar(id) {
  return new Promise ((aceito,rejeitado)=>{
    const query = "DELETE FROM libonline.exemplar WHERE idExemplar=?;"
    db.query(query,id,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
    })
  })
}
 
module.exports = {verificaSeOLivroExiste,criar,listar,editar,listaExemplarUnico,deletar}