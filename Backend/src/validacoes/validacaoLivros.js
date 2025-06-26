const Joi = require('joi');

const livroSchema = Joi.object({
  titulo: Joi.string().min(1).required().max(100),
  autor: Joi.string().min(1).required().max(100),
  editora: Joi.string().min(1).required().max(100),
  genero: Joi.string().required().min(1).max(100),

});

module.exports = livroSchema;
