const servicesGerais = require("../services/servicesGerais")

async function listaUsuarios(req,res) {
  try {
    leitores = await servicesGerais.listaUsuarios()
    res.status(200).json(leitores)
    
  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem:"Erro ao listar leitores",erro:error})
  }
}

async function listaExemplares(req,res) {
  try {
    exemplares = await servicesGerais.listaExemplares()
    res.status(200).json(exemplares)
    
  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem:"Erro ao listar exemplares",erro:error})
  }
}

async function listaFuncionarios(req,res){
   try {
    funcionarios = await servicesGerais.listaFuncionarios()
    res.status(200).json(funcionarios)
    
  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem:"Erro ao listar funcionarios",erro:error})
  }
}
module.exports = {listaUsuarios,listaExemplares,listaFuncionarios}