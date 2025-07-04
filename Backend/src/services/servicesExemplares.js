const persistanceExemplares = require("../persistance/persistanceExemplares")
const validaExemplar = require("../models/validacaoExemplar")

async function criar(exemplar){
  const { error, value } = validaExemplar.validate(exemplar, { abortEarly: false }) //Valida os dados
  if (error) {
    error.statuscode = 400
    throw error
  }

  const livro =  await persistanceExemplares.verificaSeOLivroExiste(value.idLivro)
  if(!livro[0]) {
    let erro = new Error("Livro passado nao existe")
    erro.statuscode = 400
    throw erro
  }

  await persistanceExemplares.criar(value.idLivro,value.numeroRegistro)
}

async function listar() {
  return await persistanceExemplares.listar()
}

async function editar(exemplar,id){
  const livro =  await persistanceExemplares.verificaSeOLivroExiste(exemplar.idLivro)
  if(!livro[0]) {
    let erro = new Error("Livro passado nao existe")
    erro.statuscode = 400
    throw erro
  }

  const livro2 =  await persistanceExemplares.listaExemplarUnico(id)
  if(!livro2[0]) {
    let erro = new Error("Exemplar passado nao existe")
    erro.statuscode = 400
    throw erro
  }

  if(exemplar.tipo != "disponivel" && exemplar.tipo != "emprestado" && exemplar.tipo != "reservado" && exemplar.tipo != "danificado") {
    let erro = new Error("Tipo de livro passado e invalido. Tipos permitido: {disponivel,emprestado,reservado,danificado}")
    erro.statuscode = 400
    throw erro
  }

  await persistanceExemplares.editar(id,exemplar.idLivro,exemplar.numeroRegistro,exemplar.tipo)
}

async function deletar(id){
   const livro =  await persistanceExemplares.listaExemplarUnico(id)
  if(!livro[0]) {
    let erro = new Error("Livro passado nao existe")
    erro.statuscode = 400
    throw erro
  }
  await persistanceExemplares.deletar(id)
}

module.exports = {criar,listar,editar,deletar}