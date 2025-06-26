const express = require("express");
const router = express.Router();
const controllerLivros = require("./controllers/controllerLivros")

//Rotas aqui
router.post("/cadastroLivros",controllerLivros.cadastro)
router.get("/listagemLivros",controllerLivros.listarTodos)
router.get("/listagemUnica/:id",controllerLivros.listagemUnica)
router.put("/editarLivro/:id",controllerLivros.editar)
router.delete("/deletarLivro/:id",controllerLivros.deletar)

module.exports = router;