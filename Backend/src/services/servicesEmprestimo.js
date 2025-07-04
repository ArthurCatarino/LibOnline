const validaEmprestimo = require("../models/validacaoEmprestimo")
const persistanceEmprestimos = require("../persistance/persistanceEmprestimos")
const persistanceGerais = require("../persistance/persistanceGerais")
const persistanceExemplar = require("../persistance/persistanceExemplares")

async function criar(emprestimo) {
  
  const { error, value } = validaEmprestimo.validate(emprestimo, { abortEarly: false }) //Valida os dados
  if (error) {
    error.statuscode = 400
    throw error
  }
  const funcionario = await persistanceGerais.listaFuncionarioUnico(value.idFuncionario)
  if(!funcionario[0]) {
    const erro = new Error("Bibliotecario invalido") 
    erro.statuscode = 400
    throw erro
  }

  const usuario = await persistanceGerais.listaUsuarioUnico(value.idUsuario)
  if(!usuario[0]) {
    const erro = new Error("Usuario invalido")
    erro.statuscode = 400
    throw erro
  }

  const exemplar = await persistanceExemplar.listaExemplarUnico(value.idExemplar)
  if(!exemplar[0]) { 
    const erro = new Error("Exemplar invalido")
    erro.statuscode = 400
    throw erro
  }

  let verifica = await persistanceEmprestimos.buscaEmprestimoUsuarioExemplar(value.idUsuario)
  for(const status of verifica) {
    if(status.statusEmprestimo == "ativo"){
      const erro = new Error("O usuario ja possui esse livro emprestado")
      erro.statuscode = 400
      throw erro
    }
  }
  
  const verificaSeTemAtraso = await persistanceEmprestimos.verificaSeTemEmprestimoAtrasado(value.idUsuario)
  if(verificaSeTemAtraso[0]) {
    const erro = new Error("O usuario tem um emprestimo atrasado")
    erro.statuscode = 400
    throw erro
  }

  const verificaSeExemplarEstaDisponivel = await persistanceEmprestimos.verificaSeExemplarEstaEmprestado(value.idExemplar) 
  
  if(verificaSeExemplarEstaDisponivel[0].tipo !== "disponivel") {
    const erro = new Error("Exemplar nao esta disponivel")
    erro.statuscode = 400
    throw erro
  }

  await persistanceEmprestimos.criar(value.idFuncionario,value.idUsuario,value.idExemplar)
}

async function listar() {
  return await persistanceEmprestimos.lista()
}

async function buscaEmprestimoUnico(id) {
  verificaId(id)
  const emprestimo = await persistanceEmprestimos.buscaEmprestimoUnico(id)
  if(!emprestimo[0]) {
    const erro = new Error("Nenhum emprestimo encontrado")
    erro.statuscode = 400
    throw erro
  }
  return emprestimo
}

async function devolver(id) {
  verificaId(id)
  await verifica(id)
  await persistanceEmprestimos.devolver(id)
}

async function renovar(id) {
  verificaId(id)
  await verifica(id)
  await persistanceEmprestimos.renovar(id)
}

async function deletar(id){
  verificaId(id)
  const emprestimo = await persistanceEmprestimos.buscaEmprestimoUnico(id)
  if(!emprestimo[0]){
    const erro = new Error("id invalido")
    erro.statuscode = 400
    throw erro
  }
  await persistanceEmprestimos.deletar(id)
}

async function verifica(id) {
  const emprestimo = await persistanceEmprestimos.buscaEmprestimoUnico(id)

  if(!emprestimo[0]){
    const erro = new Error("id invalido")
    erro.statuscode = 400
    throw erro
  }
  if(emprestimo[0].statusEmprestimo != "ativo") {
    const erro = new Error("O emprestimo nao esta ativo")
    erro.statuscode = 400
    throw erro
  }

}

async function editar(id,idUsuario,idExemplar){
  const emprestimo = await persistanceEmprestimos.buscaEmprestimoUnico(id)
  if(!emprestimo[0]) {
    let erro = new Error("Emprestimo com esse id nao encontrado")
    erro.statuscode = 400
    throw erro
  }
  const exemplar = await persistanceExemplar.listaExemplarUnico(idExemplar)
  if(!exemplar[0]) {
    let erro = new Error("Exemplar com esse id não encontrado")
    erro.statuscode = 400
    throw erro
  }

  const usuario = await persistanceGerais.listaUsuarioUnico(idUsuario)
  if(!usuario[0]) {
    let erro = new Error("Usuario com esse id nao encontrado")
    erro.statuscode = 400
    throw erro
  }

  await persistanceEmprestimos.editar(id,idUsuario,idExemplar) 
}

function verificaId(id){
  if(!id) {
    const erro =  new Error("Id invalido")
    erro.statuscode = 400
    throw erro
  }
}



module.exports = {criar,listar,buscaEmprestimoUnico,devolver,renovar,deletar,editar}