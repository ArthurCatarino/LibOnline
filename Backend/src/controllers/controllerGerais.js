const persistanceGerais = require("../persistance/persistanceGerais")

async function listaUsuarios(req,res) {
  try {
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
>>>>>>> Stashed changes
    leitores = await persistanceGerais.listaUsuarios()
    res.status(200).json({mensagem:leitores})
=======
    leitores = await servicesGerais.listaUsuarios()
    res.status(200).json(leitores)
>>>>>>> d0967f0935b323c4c135d7bd9c2270d05f60434d
    
  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem:"Erro ao listar leitores",erro:error})
  }
}

async function listaExemplares(req,res) {
  try {
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
>>>>>>> Stashed changes
    exemplares = await persistanceGerais.listaExemplares()
    res.status(200).json({mensagem:exemplares})
=======
    exemplares = await servicesGerais.listaExemplares()
    res.status(200).json(exemplares)
>>>>>>> d0967f0935b323c4c135d7bd9c2270d05f60434d
    
  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem:"Erro ao listar exemplares",erro:error})
  }
}

async function listaFuncionarios(req,res){
   try {
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
>>>>>>> Stashed changes
    funcionarios = await persistanceGerais.listaFuncionarios()
    res.status(200).json({mensagem:funcionarios})
=======
    funcionarios = await servicesGerais.listaFuncionarios()
    res.status(200).json(funcionarios)
>>>>>>> d0967f0935b323c4c135d7bd9c2270d05f60434d
    
  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem:"Erro ao listar funcionarios",erro:error})
  }
}
module.exports = {listaUsuarios,listaExemplares,listaFuncionarios}