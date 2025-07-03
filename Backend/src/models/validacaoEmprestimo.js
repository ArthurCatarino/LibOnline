const Joi = require('joi');

const emprestimoSchema = Joi.object({
  idUsuario: Joi.int().required(),
  idLivro: Joi.int().required(),
  idFuncionario: Joi.int().required()
});

module.exports = emprestimoSchema;
