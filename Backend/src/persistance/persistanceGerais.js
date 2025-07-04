const db = require("../db")

async function listaUsuarios() {
  return new Promise ((aceito,rejeitado)=>{
    const query = "SELECT * FROM libonline.usuario;"
    db.query(query,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
    })
  })
}

async function listaUsuarioUnico(id) {
  return new Promise ((aceito,rejeitado)=>{
    const query = "SELECT * FROM libonline.usuario WHERE idUsuario=?;"
    db.query(query,id,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
    })
  })
}

async function listaFuncionarios() {
  return new Promise ((aceito,rejeitado)=>{
    const query = "SELECT * FROM libonline.funcionario;"
    db.query(query,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
    })
  })
}

async function listaFuncionarioUnico(id) {
  return new Promise ((aceito,rejeitado)=>{
    const query = "SELECT * FROM libonline.funcionario WHERE idFuncionario=?;"
    db.query(query,id,(error,results)=>{
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



module.exports = {listaUsuarios,listaUsuarioUnico,listaFuncionarios,listaFuncionarioUnico,listaExemplarUnico}
