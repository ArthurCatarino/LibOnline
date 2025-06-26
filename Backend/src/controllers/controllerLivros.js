const servicesLivros = require("../services/servicesLivros")
const validacaoLivro = require("../validacoes/validacaoLivros")


async function cadastro(req,res) {
  const { error, value } = validacaoLivro.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      mensagem: 'Erro de validação',
      erros: error.details.map(err => err.message)
    });
  }

  try {
  await servicesLivros.cadastro(value.titulo,value.autor,value.editora,value.genero)
  return res.status(200).json({"resposta":`Livro: ${value.titulo} cadastrado com sucesso`})
  }catch(error) {
    console.error("Erro ao adicionar filme", error);
    return res.status(500).json({mensagem:"Erro ao adicionar filme",erro:error
     });
  }
} 

async function listarTodos(req,res) {
  try {
  livros = await servicesLivros.listagem();
  res.status(200).json({livros});
  }catch(error) {
    console.error("Erro ao listar livros", error);
    res.status(500).json({mensagem: "Erro ao listar livros", erro: error})
  }
}

async function listagemUnica(req,res) {
  id = req.params.id
  try{
    livro = await servicesLivros.listagemUnica(id)
    res.status(200).json({livro})
  }catch(erro){
    console.log(error)
    console.error("Erro ao listar livro", error);
    res.status(500).json({mensagem:"Erro ao listar livro",erro:error})
  }
}

async function editar(req,res) {

  id = req.params.id
  try {
    livroAntigo = await servicesLivros.listagemUnica(id);
    if(!livroAntigo[0]) {
      res.status(400).json({message:"Id do livro nao existe"})
      return
    }
    let {titulo, autor, editora, genero} = req.body
    novoLivro = {titulo:titulo,autor:autor,editora:editora,genero:genero}
    novoLivro = verificaDiferencas(novoLivro,livroAntigo[0])

    const { error, value } = validacaoLivro.validate(novoLivro, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        mensagem: 'Erro de validação',
        erros: error.details.map(err => err.message)
      });
    }
    dados = [value.titulo,value.autor,value.editora,value.genero,id]
    await servicesLivros.editar(dados)
    res.status(200).json({message:"Livro atualizado com sucesso"})

  }catch(error){
    console.error("Erro ao atualizar livro", error);
    res.status(500).json({mensagem:"Erro ao atualizar livro", erro:error})
  }
}

async function deletar(req,res) {

  id = req.params.id
  try{
    livro = await servicesLivros.listagemUnica(id)
    console.log(livro)
    if(!livro[0]) {
      return res.status(400).json({mensagem:"Id do livro nao encontrado"})
    }

    await servicesLivros.deletar(id)
    res.status(200).json({mensagem:"Livro deletado com sucesso"})
  }catch(error){
    console.error("Erro ao deletar livro", error);
    res.status(500).json({mensagem:"Erro ao deletar livro", erro:error})
  }

}

function verificaDiferencas(livroNovo,livroAntigo) {
  
  if(livroNovo.titulo) {livroAntigo.titulo = livroNovo.titulo}
  if(livroNovo.autor) {livroAntigo.autor = livroNovo.autor}
  if(livroNovo.editora) {livroAntigo.editora = livroNovo.editora}
  if(livroNovo.genero) {livroAntigo.genero = livroNovo.genero}

  return livroAntigo
}

module.exports = {cadastro,listarTodos,listagemUnica,editar,deletar}