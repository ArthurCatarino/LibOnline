const express = require("express");
const router = express.Router();
const controllerLivros = require("./controllers/controllerLivros");
const controllerEmprestimo = require("./controllers/controllerEmprestimo");
const controllerLogin = require("./controllers/controllerLogin");
const controllerGerais = require("./controllers/controllerGerais");
const controllerExemplar = require("./controllers/controllerExemplar")

//Rotas cadastro de livros
router.post("/cadastroLivros", controllerLivros.cadastro);
router.get("/listagemLivros", controllerLivros.listarTodos);
router.get("/listagemUnica/:id", controllerLivros.listagemUnica);
router.put("/editarLivro/:id", controllerLivros.editar);
router.delete("/deletarLivro/:id", controllerLivros.deletar);

//Rotas de emprestimos
router.post("/criarEmprestimo", controllerEmprestimo.criar);
router.put("/editarEmprestimo",controllerEmprestimo.editar)
router.get("/listaEmprestimos", controllerEmprestimo.listar);
router.get("/buscaEmprestimo/:id", controllerEmprestimo.verEmprestimoUnico);
router.put("/devolverEmprestimo/:id", controllerEmprestimo.devolver);
router.put("/renovarEmprestimo/:id", controllerEmprestimo.renovar);
router.delete("/deletarEmprestimo/:id", controllerEmprestimo.deletar);

//Rotas de Exemplares
router.post("/criarExemplar",controllerExemplar.criar)
router.get("/listarExemplares",controllerExemplar.listar)
router.put("/editarExemplar/:id",controllerExemplar.editar)
router.delete("/deletarExemplar/:id",controllerExemplar.deletar)

//Rotas gerais
router.get("/listarUsuarios", controllerGerais.listaUsuarios);
router.get("/listarFuncionarios", controllerGerais.listaFuncionarios);

//login
router.post("/login", controllerLogin.login);

module.exports = router;
