const servicesLogin = require("../services/servicesLogin")

async function login(req,res){
  let {email,senha} = req.body
  if(!email || !senha){
    res.status(400).json({mensagem:"Email ou senha nao foram inseridos"})
    return
  }
  try {
    usuario = await servicesLogin.login(email,senha)
    res.status(200).json({mensagem:usuario})
  } catch (error) {
    console.error(error)
    res.status(500).json({mensagem:"Erro ao fazer login",erro:error}) 
  }
}

module.exports = {login}