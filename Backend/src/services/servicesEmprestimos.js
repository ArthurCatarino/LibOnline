const db = require("../db")

async function criarEmprestimo(idFuncionario,idUsuario,idExemplar){
  return new Promise((aceito,rejeitado) => {
    const query = "INSERT into libonline.emprestimo (idUsuario, idExemplar,idFuncionario, dataEmprestimo, dataDevolucaoPrevista,statusEmprestimo) VALUES(?,?,?,CURRENT_TIMESTAMP,DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 15 DAY),'ativo');"
    dados = [idUsuario,idExemplar,idFuncionario]
    db.query(query,dados,(erro,results)=>{
      if(erro){
        rejeitado(erro)
        return
      }
      aceito(results)
    })

  })
}

async function buscaEmprestimoUsuarioExemplar(idUsuario,idExemplar) {
  return new Promise((aceito,rejeitado)=>{
    const query = "SELECT statusEmprestimo FROM libonline.emprestimo WHERE idUsuario=? and idExemplar=?;"
    dados = [idUsuario,idExemplar]
    db.query(query,dados,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
    })
  })
}

async function listaEmprestimos(){
  return new Promise((aceito,rejeitado)=>{
    const query = "SELECT * FROM libonline.emprestimo;"
    db.query(query,((error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
    }))
  })
}

async function buscaEmprestimoUnico(id) {
return new Promise((aceito,rejeitado)=>{
    const query = "SELECT * FROM libonline.emprestimo WHERE idEmprestimo=?;"
    db.query(query,id,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
    })
  })
}

async function editarEmprestimo(id) {
return new Promise((aceito,rejeitado)=>{
    const query = "UPDATE libonline.emprestimo SET dataDevolucaoReal=current_timestamp() , statusEmprestimo='devolvido'  WHERE idEmprestimo=?;"
    db.query(query,id,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
    })
  })
}

async function deletarEmprestimo(id) {
  return new Promise((aceito,rejeitado)=>{
    const query = "DELETE FROM libonline.emprestimo WHERE idEmprestimo=?;"
    db.query(query,id,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
    })
  })
}


module.exports = {criarEmprestimo,buscaEmprestimoUnico,listaEmprestimos,buscaEmprestimoUsuarioExemplar,editarEmprestimo,deletarEmprestimo}