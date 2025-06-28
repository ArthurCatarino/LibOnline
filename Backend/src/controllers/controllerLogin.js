async function login(req,res){
  let {email,senha} = req.body
  if(!email || !senha){
    res.status(400).json({mensagem:"olaaa"})
  }
}