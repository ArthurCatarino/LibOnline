const validacaoLivro = require("../models/validacaoLivros")
const persistanceLivro = require("../persistance/persistanceLivros")

async function cadastro(livro){
  const { error, value } = validacaoLivro.validate(livro, { abortEarly: false }) //Valida os dados
  if (error) {
    throw error
  }
  const dados = await persistanceLivro.verificaSeLivroJaExiste(value.titulo)
  if(dados[0]) {
    throw new Error("Esse livro ja existe")
  }
  await persistanceLivro.cadastro(value.titulo,value.autor,value.editora,value.genero)
  return value
}

async function listarTodos() {
  return persistanceLivro.listagem()
}

async function listagemUnica(id) {
   return await persistanceLivro.listagemUnica(id) 
}

async function editar(id,novoLivro) {
  livroAntigo = await persistanceLivro.listagemUnica(id);
    if(!livroAntigo[0]) {
      throw Error("Id do livro nao encontrado")
    }
  
  novoLivro = verificaDiferencas(novoLivro,livroAntigo[0])
  
  const { error, value } = validacaoLivro.validate(novoLivro, { abortEarly: false });
    if (error) {
      throw error
    }
  dados = [value.titulo,value.autor,value.editora,value.genero,id]
  
  await persistanceLivro.editar(dados)
}

async function deletar(id) {
  livro = await persistanceLivro.listagemUnica(id)
    if(!livro[0]) {
      throw new Error("Id do livro nao encontrado")
    }
  await persistanceLivro.deletar(id)
}

function verificaDiferencas(livroNovo,livroAntigo) {
  
  
  if(livroNovo.titulo) {livroAntigo.titulo = livroNovo.titulo}
  if(livroNovo.autor) {livroAntigo.autor = livroNovo.autor}
  if(livroNovo.editora) {livroAntigo.editora = livroNovo.editora}
  if(livroNovo.genero) {livroAntigo.genero = livroNovo.genero}

  return livroAntigo
}


module.exports = { cadastro, listagem, listagemUnica, editar, deletar };
