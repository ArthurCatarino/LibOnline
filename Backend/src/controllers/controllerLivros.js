const persistanceLivros = require("../persistance/persistanceLivros")
const servicesLivros = require("../services/servicesLivros")
const validacaoLivro = require("../models/validacaoLivros")
const modelLivro = require("../models/modelLivros")


async function cadastro(req,res) {
  try {

  const {titulo, autor,genero,editora} = req.body 
  let livro = new modelLivro(titulo, autor,genero,editora)
  
  livro =  await servicesLivros.cadastro(livro)
  return res.status(200).json({"resposta":`Livro: ${livro.titulo} cadastrado com sucesso`})

  }catch(error) {
    console.error("Erro ao adicionar filme", error);
    let codigoHTTP = 500
    if(error.message == "Esse livro ja existe" || error.deatails ) {codigoHTTP = 400}
    return res.status(codigoHTTP).json({mensagem:"Erro ao adicionar filme",erro:error.message})
  }
} 

async function listarTodos(req,res) {
  try {
  livros = await servicesLivros.listarTodos()
  res.status(200).json({livros});
  }catch(error) {
    console.error("Erro ao listar livros", error);
    res.status(500).json({mensagem: "Erro ao listar livros", erro: error})

async function listagemUnica(req,res) {
  try{
    id = req.params.id
    livro = await servicesLivros.listagemUnica(id)
    res.status(200).json({livro})
  }catch(erro){
    console.error("Erro ao listar livro", erro);
    res.status(500).json({mensagem:"Erro ao listar livro",erro:erro.message})
  }
}

async function editar(req,res) {

  try {
    id = req.params.id
    let {titulo, autor, editora, genero} = req.body
    const livro = new modelLivro(titulo,autor,genero,editora)

    await servicesLivros.editar(id,livro)
    res.status(200).json({message:"Livro atualizado com sucesso"})

  }catch(error){
    let codigoHTTP = 500
    if(error.message == "Id do livro nao encontrado" || error.details) {codigoHTTP = 400}
    console.error("Erro ao atualizar livro", error);
    res.status(codigoHTTP).json({mensagem:"Erro ao atualizar livro", erro:error.message})
  }
}

async function deletar(req,res) {
  try{
    id = req.params.id
    await servicesLivros.deletar(id)
    res.status(200).json({mensagem:"Livro deletado com sucesso"})
  }catch(error){
    let codigoHTTP  = 500
    if(error.message = "Id do livro nao encontrado") {codigoHTTP = 400}
    console.error("Erro ao deletar livro", error);
    res.status(codigoHTTP).json({mensagem:"Erro ao deletar livro", erro:error.message})

function verificaDiferencas(livroNovo, livroAntigo) {
  if (livroNovo.titulo) {
    livroAntigo.titulo = livroNovo.titulo;
  }
  if (livroNovo.autor) {
    livroAntigo.autor = livroNovo.autor;
  }
  if (livroNovo.editora) {
    livroAntigo.editora = livroNovo.editora;
  }
  if (livroNovo.genero) {
    livroAntigo.genero = livroNovo.genero;
  }
  return livroAntigo;
}

module.exports = {cadastro,listarTodos,listagemUnica,editar,deletar}
