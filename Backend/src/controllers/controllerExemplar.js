const servicesExemplares = require("../services/servicesExemplares")
const modelExemplar = require("../models/modelExemplar")

async function criar(req, res) {
  try {
    let {idLivro,numeroRegistro} = req.body
    const exemplar = new modelExemplar(idLivro,numeroRegistro)
    await servicesExemplares.criar(exemplar)
    res.status(200).json({mensagem:"Exemplar cadastrado com sucesso"});
  } catch (error) {
    let codigoHTTP = 500
    if(error.statuscode) {codigoHTTP = error.statuscode}
    console.log(error);
    res.status(codigoHTTP).json({ mensagem: "Erro ao cadastrar exemplares", erro:error.message});
  }
}

async function listar(req, res) {
  try {
    const exemplares = await servicesExemplares.listar()
    res.status(200).json(exemplares);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: "Erro ao listar exemplares", erro: error.message });
  }
}

async function editar(req,res) {
  try {
    const id = req.params.id
    let {idLivro,numeroRegistro,tipo} = req.body
    const exemplar = new modelExemplar(idLivro,numeroRegistro,tipo)
    await servicesExemplares.editar(exemplar,id)
    res.status(200).json({mensagem:"Exemplar editado com sucesso"})

  } catch (error) {
    let codigoHTTP = 500
    if(error.statuscode) {codigoHTTP = 400}
    console.error(error)
    res.status(codigoHTTP).json({ mensagem:"Erro ao editar exemplares", erro:error.message })
  }
}

async function deletar(req,res){
  try {
    const id = req.params.id
    await servicesExemplares.deletar(id)
    res.status(200).json({mensagem:"Exemplar deletado com sucesso"})
  } catch (error) {
    console.log(error)
    res.status(500).json({mensagem:"Erro ao excluir exemplar", erro:error.message })
  }
}

module.exports = {criar,listar,editar,deletar}