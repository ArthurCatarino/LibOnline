const servicesGerais = require("../services/servicesGerais")
const servicesEmprestimos = require("../services/servicesEmprestimos")

async function teste(req,res){
  try {
    geral = await servicesGerais.listaExemplares()
    unico = await servicesGerais.listaExemplarUnico(2)
    res.json({geral:geral,unico:unico})
  }catch(error){
    console.error(error);
    res.json("Erro")
  }
}

async function criarEmprestimo (req,res) {

  let {idFuncionario,idUsuario,idExemplar} = req.body
  verifica = verificaIds(idFuncionario,idUsuario,idExemplar)
  if(verifica) {
    res.status(400).json({messagem:verifica})
  }
  try {

    funcionario = await servicesGerais.listaFuncionarioUnico(idFuncionario)
    if(!funcionario[0]) {
      res.status(400).json({mensagem:"Bibliotecario invalido"})
      return
    }

    usuario = await servicesGerais.listaUsuarioUnico(idUsuario)
    if(!usuario[0]) {
      res.status(400).json({mensagem:"Usuario invalido"})
      return
    }

    exemplar = await servicesGerais.listaExemplarUnico(idExemplar)
    if(!exemplar[0]) {
      res.status(400).json({mensagem:"Exemplar invalido"})
      return
    }
    
    verifica = await servicesEmprestimos.buscaEmprestimoUsuarioExemplar(idUsuario,idExemplar)

    for(const status of verifica) {
      if(status.statusEmprestimo == "ativo"){
        res.status(400).json({mensagem:"O usuario ja tem um emprestimo deste exemplar"})
        return
      }
    }

    await servicesEmprestimos.criarEmprestimo(idFuncionario,idUsuario,idExemplar)
    res.status(200).json({mensagem:"Emprestimo criado "})
    return

  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem:"Erro ao criar emprestimo",erro:error})
  }
}

async function listarEmprestimos (req,res) {
  try {

    emprestimos = await servicesEmprestimos.listaEmprestimos()
    res.status(200).json({mensagem:emprestimos})

  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem:"Erro ao listar emprestimos",erro:error})
  }
}
async function verEmprestimoUnico (req,res) {
  id = req.params.id
  try {
  emprestimo = await servicesEmprestimos.buscaEmprestimoUnico(id)
  if(!emprestimo[0]){
    res.status(400).json({mensagem:"Id invalido"})
    return
  }
  res.status(200).json({mensagem:emprestimo[0]})
  }catch(erro){
    console.error(erro)
    res.status(500).json({mensagem:"Erro ao buscar emprestimo",erro:erro})
  }
}

async function devolverEmprestimo (req,res) {
  id = req.params.id
  try{
  
  emprestimo = await servicesEmprestimos.buscaEmprestimoUnico(id)
  verifica = verificaEmprestimo(emprestimo[0])
  if(verifica) {
    res.status(400).json({mensagem:verifica})
    return
  }
  await servicesEmprestimos.devolverEmprestimo(id)
  res.status(200).json({mensagem:"Emprestimo devolvido com sucesso"})

  }catch(error){
    console.error(error)
    res.status(500).json({mensagem:"Erro ao editar emprestimo",erro:error})
  }
}

async function deletarEmprestimo (req,res) {
  id = req.params.id
  try {
    emprestimo = await servicesEmprestimos.buscaEmprestimoUnico(id)
    if(!emprestimo[0]){
      res.status(400).json({mensagem:"Id invalido"})
      return
    }
    await servicesEmprestimos.deletarEmprestimo(id)
    res.status(200).json({mensagem:"Emprestimo deletado com sucesso"})
  } catch (error) {
    console.error(error)
    res.status(500).json({mensagem:"Erro ao deletar emprestimo",erro:error})
  }
}

async function renovarEmprestimo (req,res) {
  id = req.params.id
  try{
  
  emprestimo = await servicesEmprestimos.buscaEmprestimoUnico(id)
  verifica = verificaEmprestimo(emprestimo[0])
  if(verifica) {
    res.status(400).json({mensagem:verifica})
    return
  }


  await servicesEmprestimos.renovarEmprestimo(id)
  res.status(200).json({mensagem:"Emprestimo renovado com sucesso"})

  }catch(error){
    console.error(error)
    res.status(500).json({mensagem:"Erro ao renovar emprestimo",erro:error})
  }
}

function verificaIds(idFuncionario,idUsuario,idExemplar) {
  if(!idFuncionario) {
    return "IdFuncionario nao pode ser vazio"
  }
  if(!idUsuario) {
    return "idUsuario nao pode ser vazio"
  } 
  if(!idExemplar) {
    return "idExemplar nao pode ser vazio"
  }  
}

function verificaEmprestimo(emprestimo) {
  if(!emprestimo){
    return "id invalido"
  }
  if(emprestimo.statusEmprestimo != "ativo") {
    return "Este emprestimo nao esta ativo"
  }

}

module.exports = {criarEmprestimo,verEmprestimoUnico,listarEmprestimos,renovarEmprestimo,deletarEmprestimo,teste,devolverEmprestimo}