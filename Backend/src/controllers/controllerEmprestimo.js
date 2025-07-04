const persistanceGerais = require("../persistance/persistanceGerais")
const persistanceEmprestimos = require("../persistance/persistanceEmprestimos")
const serviceEmprestimos = require("../services/servicesEmprestimo")
const modelEmprestimo = require("../models/modelEmprestimo")
const emprestimo = require("../models/modelEmprestimo")

async function criar (req,res) {
  try {

    let {idFuncionario,idUsuario,idExemplar} = req.body
    let emprestimo = new modelEmprestimo(idUsuario,idExemplar,idFuncionario)
    await serviceEmprestimos.criar(emprestimo)
    res.status(200).json({mensagem:"Emprestimo criado "})

  } catch (error) {
    let codigoHTTP = 500
    if(error.statuscode) {
      codigoHTTP = error.statuscode
    }
    console.log(error)
    res.status(codigoHTTP).json({mensagem:"Erro ao criar emprestimo",erro:error.message})
  }
}

async function listar (req,res) {
  try {
    emprestimos = await serviceEmprestimos.listar()
    res.status(200).json(emprestimos)

  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem:"Erro ao listar emprestimos",erro:error})
  }
}

async function verEmprestimoUnico (req,res) {
  try {
    id = req.params.id
    emprestimoBuscado = await serviceEmprestimos.buscaEmprestimoUnico(id)
    res.status(200).json(emprestimoBuscado)
  }catch(erro){
    codigoHTTP = 500;
    if(erro.statuscode) {codigoHTTP = erro.statuscode}
    console.error(erro)
    res.status(codigoHTTP).json({mensagem:"Erro ao buscar emprestimo",erro:erro.message})
  }
}

async function devolver (req,res) {
  try{  
  id = req.params.id
  await serviceEmprestimos.devolver(id) 
  res.status(200).json({mensagem:"Emprestimo devolvido com sucesso"})

  }catch(error){
    let codigoHTTP = 500
    if(error.statuscode) {codigoHTTP = 400}
    console.error(error)
    res.status(codigoHTTP).json({mensagem:"Erro ao devolver emprestimo",erro:error.message})
  }
}

async function deletar (req,res) {
  try {
    id = req.params.id
    await serviceEmprestimos.deletar(id)
    res.status(200).json({mensagem:"Emprestimo deletado com sucesso"})
  } catch (error) {
    let codigoHTTP = 500
    if(error.statuscode) {codigoHTTP = 400}
    console.error(error)
    res.status(codigoHTTP).json({mensagem:"Erro ao deletar emprestimo",erro:error.message})
  }
}

async function renovar (req,res) {
  try{
  id = req.params.id 
  await serviceEmprestimos.renovar(id)
  res.status(200).json({mensagem:"Emprestimo renovado com sucesso"})
  }catch(error){
    codigoHTTP = 500
    if(error.statuscode) {codigoHTTP = error.statuscode}
    console.error(error)
    res.status(codigoHTTP).json({mensagem:"Erro ao renovar emprestimo",erro:error.message})
  }
}

async function editar(req,res){
  
}



module.exports = {criar,verEmprestimoUnico,listar,renovar,deletar,devolver,editar}