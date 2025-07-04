const Joi = require('joi');

const emprestimoSchema = Joi.object({
  idUsuario: Joi.number().integer().required(),
  idExemplar: Joi.number().integer().required(),
  idFuncionario: Joi.number().integer().required()
});

module.exports = emprestimoSchema;
