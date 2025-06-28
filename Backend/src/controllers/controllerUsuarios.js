const servicesGerais = require("../services/servicesGerais")

async function listaUsuarios(req,res) {
  try {
    leitores = await servicesGerais.listaUsuarios()
    res.status(200).json({mensagem:leitores})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem:"Erro ao listar leitores",erro:error})
  }
}

module.exports = {listaUsuarios}