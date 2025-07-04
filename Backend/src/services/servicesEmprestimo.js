const validaEmprestimo = require("../models/validacaoEmprestimo")
const persistanceEmprestimos = require("../persistance/persistanceEmprestimos")
const persistanceGerais = require ("../persistance/persistanceGerais")

async function cadastraEmprestimo(emprestimo) {
  
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

  const exemplar = await persistanceGerais.listaExemplarUnico(value.idLivro)
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

  const verificaSeExemplarEstaDisponivel = await persistanceEmprestimos.verificaSeExemplarEstaEmprestado(value.idLivro) 
  
  if(verificaSeExemplarEstaDisponivel[0].tipo !== "disponivel") {
    const erro = new Error("Exemplar nao esta disponivel")
    erro.statuscode = 400
    throw erro
  }

  await persistanceEmprestimos.criarEmprestimo(value.idFuncionario,value.idUsuario,value.idLivro)
}

async function listarEmprestimos() {
  return persistanceEmprestimos.listaEmprestimos()
}

module.exports = {cadastraEmprestimo,listarEmprestimos}