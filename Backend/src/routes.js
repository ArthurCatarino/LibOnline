const express = require("express");
const router = express.Router();
const controllerLivros = require("./controllers/controllerLivros");
const controllerEmprestimo = require("./controllers/controllerEmprestimo");
const controllerLogin = require("./controllers/controllerLogin");
const controllerGerais = require("./controllers/controllerGerais");

// testes
<<<<<<< Updated upstream
//router.get("/teste",controllerEmprestimo.teste)
=======
<<<<<<< HEAD
//router.get("/teste",controllerEmprestimo.teste)
=======
router.get("/teste", controllerEmprestimo.teste);
>>>>>>> d0967f0935b323c4c135d7bd9c2270d05f60434d
>>>>>>> Stashed changes

//Rotas cadastro de livros
router.post("/cadastroLivros", controllerLivros.cadastro);
router.get("/listagemLivros", controllerLivros.listarTodos);
router.get("/listagemUnica/:id", controllerLivros.listagemUnica);
router.put("/editarLivro/:id", controllerLivros.editar);
router.delete("/deletarLivro/:id", controllerLivros.deletar);

//Rotas de emprestimos
<<<<<<< HEAD
router.post("/criarEmprestimo",controllerEmprestimo.criarEmprestimo)
//router.get("/listaEmprestimos",controllerEmprestimo.listarEmprestimos)
//router.get("/buscaEmprestimo/:id",controllerEmprestimo.verEmprestimoUnico)
//router.put("/devolverEmprestimo/:id",controllerEmprestimo.devolverEmprestimo)
//router.put("/renovarEmprestimo/:id",controllerEmprestimo.renovarEmprestimo)
//router.delete("/deletarEmprestimo/:id",controllerEmprestimo.deletarEmprestimo)

//Rotas gerias
//router.get("/listarUsuarios",controllerGerais.listaUsuarios)
//router.get("/listarExemplares",controllerGerais.listaExemplares)
//router.get("/listarFuncionarios",controllerGerais.listaFuncionarios)

//login
//router.post("/login",controllerLogin.login)
<<<<<<< Updated upstream
=======
=======
router.post("/criarEmprestimo", controllerEmprestimo.criarEmprestimo);
router.get("/listaEmprestimos", controllerEmprestimo.listarEmprestimos);
router.get("/buscaEmprestimo/:id", controllerEmprestimo.verEmprestimoUnico);
router.put("/devolverEmprestimo/:id", controllerEmprestimo.devolverEmprestimo);
router.put("/renovarEmprestimo/:id", controllerEmprestimo.renovarEmprestimo);
router.delete("/deletarEmprestimo/:id", controllerEmprestimo.deletarEmprestimo);
>>>>>>> Stashed changes

//Rotas gerias
router.get("/listarUsuarios", controllerGerais.listaUsuarios);
router.get("/listarExemplares", controllerGerais.listaExemplares);
router.get("/listarFuncionarios", controllerGerais.listaFuncionarios);

//login
router.post("/login", controllerLogin.login);
>>>>>>> d0967f0935b323c4c135d7bd9c2270d05f60434d

module.exports = router;
