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
    let dados = []
    const query1 = "SELECT statusEmprestimo, e.idLivro FROM libonline.emprestimo natural join libonline.exemplar e WHERE idUsuario=?;"
    db.query(query1,idUsuario,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
      
      for(i in results) {
        let resposta = {
          statusEmprestimo:results[0].statusEmprestimo,
          nomeLivro:null,
          idLivro:results[0].idLivro
        }
        dados.push(resposta)
    }
      for(i in dados) {
      const query2 = "select titulo from libonline.livro where id=?;"
      db.query(query2,dados[i].idLivro,(error,results)=>{
        if(error){
          rejeitado(error)
          return
        }
        aceito(results)
        dados[i].nomeLivro = results[0].titulo
        console.log(dados[i])
      })
    }
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

async function devolverEmprestimo(id) {
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

async function renovarEmprestimo(id) {
return new Promise((aceito,rejeitado)=>{
    const query = "UPDATE libonline.emprestimo SET dataDevolucaoPrevista =DATE_ADD(dataDevolucaoPrevista, INTERVAL 20 DAY) WHERE idEmprestimo=?;"
    db.query(query,id,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
    })
  })
}


module.exports = {criarEmprestimo,buscaEmprestimoUnico,listaEmprestimos,buscaEmprestimoUsuarioExemplar,devolverEmprestimo,deletarEmprestimo,renovarEmprestimo}