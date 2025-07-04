const persistanceGerais = require("../persistance/persistanceGerais");

async function listaUsuarios(req, res) {
  try {
    leitores = await persistanceGerais.listaUsuarios();
    res.status(200).json(leitores);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: "Erro ao listar leitores", erro: error });
  }
}
async function listaFuncionarios(req, res) {
  try {
    funcionarios = await persistanceGerais.listaFuncionarios();
    res.status(200).json(funcionarios);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ mensagem: "Erro ao listar funcionarios", erro: error });
  }
}
module.exports = { listaUsuarios, listaFuncionarios };
