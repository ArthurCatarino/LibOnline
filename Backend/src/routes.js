const express = require("express");
const router = express.Router();
const controllerLivros = require("./controllers/controllerLivros")
const controllerEmprestimo = require("./controllers/controllerEmprestimo")
const controllerLogin = require("./controllers/controllerLogin")
const controllerUsuario = require("./controllers/controllerUsuarios")

// testes
router.get("/teste",controllerEmprestimo.teste)

//Rotas cadastro de livros
router.post("/cadastroLivros",controllerLivros.cadastro)
router.get("/listagemLivros",controllerLivros.listarTodos)
router.get("/listagemUnica/:id",controllerLivros.listagemUnica)
router.put("/editarLivro/:id",controllerLivros.editar)
router.delete("/deletarLivro/:id",controllerLivros.deletar)

//Rotas de emprestimos
router.post("/criarEmprestimo",controllerEmprestimo.criarEmprestimo)
router.get("/listaEmprestimos",controllerEmprestimo.listarEmprestimos)
router.get("/buscaEmprestimo/:id",controllerEmprestimo.verEmprestimoUnico)
router.put("/devolverEmprestimo/:id",controllerEmprestimo.devolverEmprestimo)
router.put("/renovarEmprestimo/:id",controllerEmprestimo.renovarEmprestimo)
router.delete("/deletarEmprestimo/:id",controllerEmprestimo.deletarEmprestimo)

//Rotas gerias
router.get("/listarUsuarios",controllerUsuario.listaUsuarios)

//login
router.post("/login",controllerLogin.login)

module.exports = router;