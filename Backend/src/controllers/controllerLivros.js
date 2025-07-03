<<<<<<< Updated upstream
=======
<<<<<<< HEAD
>>>>>>> Stashed changes
const persistanceLivros = require("../persistance/persistanceLivros")
const servicesLivros = require("../services/servicesLivros")
const validacaoLivro = require("../models/validacaoLivros")
const modelLivro = require("../models/modelLivros")


async function cadastro(req,res) {
<<<<<<< Updated upstream
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
=======
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
=======
const servicesLivros = require("../services/servicesLivros");
const validacaoLivro = require("../validacoes/validacaoLivros");

async function cadastro(req, res) {
  const { error, value } = validacaoLivro.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      mensagem: "Erro de validação",
      erros: error.details.map((err) => err.message),
    });
  }

  try {
    await servicesLivros.cadastro(
      value.titulo,
      value.autor,
      value.editora,
      value.genero
    );
    return res
      .status(200)
      .json({ resposta: `Livro: ${value.titulo} cadastrado com sucesso` });
  } catch (error) {
    console.error("Erro ao adicionar filme", error);
    return res
      .status(500)
      .json({ mensagem: "Erro ao adicionar filme", erro: error });
>>>>>>> d0967f0935b323c4c135d7bd9c2270d05f60434d
>>>>>>> Stashed changes
  }
}

async function listarTodos(req, res) {
  try {
<<<<<<< HEAD
  livros = await servicesLivros.listarTodos()
  res.status(200).json({livros});
  }catch(error) {
=======
    livros = await servicesLivros.listagem();
    res.status(200).json(livros);
  } catch (error) {
>>>>>>> d0967f0935b323c4c135d7bd9c2270d05f60434d
    console.error("Erro ao listar livros", error);
    res.status(500).json({ mensagem: "Erro ao listar livros", erro: error });
  }
}

<<<<<<< HEAD
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
<<<<<<< Updated upstream
=======
=======
async function listagemUnica(req, res) {
  id = req.params.id;
  try {
    livro = await servicesLivros.listagemUnica(id);
    res.status(200).json({ livro });
  } catch (erro) {
    console.log(error);
    console.error("Erro ao listar livro", error);
    res.status(500).json({ mensagem: "Erro ao listar livro", erro: error });
  }
}

async function editar(req, res) {
  id = req.params.id;
  try {
    livroAntigo = await servicesLivros.listagemUnica(id);
    if (!livroAntigo[0]) {
      res.status(400).json({ message: "Id do livro nao existe" });
      return;
    }
    let { titulo, autor, editora, genero } = req.body;
    novoLivro = {
      titulo: titulo,
      autor: autor,
      editora: editora,
      genero: genero,
    };
    novoLivro = verificaDiferencas(novoLivro, livroAntigo[0]);

    const { error, value } = validacaoLivro.validate(novoLivro, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        mensagem: "Erro de validação",
        erros: error.details.map((err) => err.message),
      });
    }
    dados = [value.titulo, value.autor, value.editora, value.genero, id];
    await servicesLivros.editar(dados);
    res.status(200).json({ message: "Livro atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar livro", error);
    res.status(500).json({ mensagem: "Erro ao atualizar livro", erro: error });
  }
}

async function deletar(req, res) {
  id = req.params.id;
  try {
    livro = await servicesLivros.listagemUnica(id);
    if (!livro[0]) {
      return res.status(400).json({ mensagem: "Id do livro nao encontrado" });
    }

    await servicesLivros.deletar(id);
    res.status(200).json({ mensagem: "Livro deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar livro", error);
    res.status(500).json({ mensagem: "Erro ao deletar livro", erro: error });
  }
}

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
>>>>>>> d0967f0935b323c4c135d7bd9c2270d05f60434d
>>>>>>> Stashed changes
  }

  return livroAntigo;
}

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
>>>>>>> Stashed changes


module.exports = {cadastro,listarTodos,listagemUnica,editar,deletar}
=======
module.exports = { cadastro, listarTodos, listagemUnica, editar, deletar };
>>>>>>> d0967f0935b323c4c135d7bd9c2270d05f60434d
