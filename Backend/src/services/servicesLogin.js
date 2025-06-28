const db = require("../db")

async function login(email, senha) {
  return new Promise((aceito, rejeitado) => {
    const queryUsuario = `
      SELECT idUsuario
      FROM libonline.usuario
      WHERE email = ? AND senha = ?;
    `;

    const dados = [email, senha];

    db.query(queryUsuario, dados, (erro, results) => {
      if (erro) {
        rejeitado(erro);
        return;
      }

      if (results.length === 0) {
        rejeitado(new Error('Usuário ou senha inválidos'));
        return;
      }

      const usuario = results[0];

      // Agora faz a consulta na tabela funcionarios
      const queryFuncionario = `
        SELECT cargo FROM libonline.funcionario WHERE idUsuario = ?;
      `;

      db.query(queryFuncionario, [usuario.idUsuario], (erro2, results2) => {
        if (erro2) {
          rejeitado(erro2);
          return;
        }

        const cargo = results2.length > 0 ? results2[0].cargo : 'USUARIO';

        aceito({
          ...usuario,
          cargo: cargo
        });
      });
    });
  });
}


module.exports = {login}