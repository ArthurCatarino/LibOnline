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

module.exports = {criar,listar}