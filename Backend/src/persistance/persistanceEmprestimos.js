const db = require("../db")

async function criarEmprestimo(idFuncionario, idUsuario, idExemplar) {
  return new Promise((aceito, rejeitado) => {
    db.getConnection((err, connection) => {
      if (err) {
        rejeitado(err);
        return;
      }

      connection.beginTransaction((err) => {
        if (err) {
          connection.release();
          rejeitado(err);
          return;
        }

        const queryEmprestimo = `
          INSERT INTO libonline.emprestimo 
          (idUsuario, idExemplar, idFuncionario, dataEmprestimo, dataDevolucaoPrevista, statusEmprestimo)
          VALUES (?, ?, ?, CURRENT_TIMESTAMP, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 15 DAY), 'ativo');
        `;

        const dadosEmprestimo = [idUsuario, idExemplar, idFuncionario];

        connection.query(queryEmprestimo, dadosEmprestimo, (err, resultEmprestimo) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              rejeitado(err);
            });
          }

          const queryExemplar = `UPDATE libonline.exemplar SET tipo = ? WHERE idExemplar = ?;`;
          const dadosExemplar = ["emprestado", idExemplar];

          connection.query(queryExemplar, dadosExemplar, (err, resultExemplar) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                rejeitado(err);
              });
            }

            connection.commit((err) => {
              if (err) {
                return connection.rollback(() => {
                  connection.release();
                  rejeitado(err);
                });
              }

              connection.release();
              aceito({ emprestimo: resultEmprestimo, exemplar: resultExemplar });
            });
          });
        });
      });
    });
  });
}

async function buscaEmprestimoUsuarioExemplar(idExemplar,idUsuario) {
  return new Promise((aceito,rejeitado)=>{
    const query1 = "SELECT statusEmprestimo, e.idLivro FROM libonline.emprestimo natural join libonline.exemplar e where idExemplar=? and idUsuario=?;"
    dados = [idExemplar,idUsuario]
    db.query(query1,dados,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
  })
})
}

async function verificaSeTemEmprestimoAtrasado(id) {
return new Promise((aceito,rejeitado)=>{
  const query1 = "SELECT statusEmprestimo from libonline.emprestimo WHERE idUsuario=? and statusEmprestimo= 'atrasado';"
  db.query(query1,id,(error,results)=>{
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

async function verificaSeExemplarEstaEmprestado(id) {
  return new Promise((aceito,rejeitado)=>{
    const query = "select tipo from libonline.exemplar WHERE exemplar.idExemplar=?;"
    db.query(query,id,(error,results)=>{
      if(error){
        rejeitado(error)
        return
      }
      aceito(results)
    })
  })
}


module.exports = {criarEmprestimo,buscaEmprestimoUnico,listaEmprestimos,buscaEmprestimoUsuarioExemplar,devolverEmprestimo,deletarEmprestimo,renovarEmprestimo,verificaSeTemEmprestimoAtrasado,verificaSeExemplarEstaEmprestado}