const Joi = require('joi');

const exemplarLivro = Joi.object({
  idLivro: Joi.number().integer().required(),
  numeroRegistro: Joi.string().min(1).required().max(100)
});

module.exports = exemplarLivro;
