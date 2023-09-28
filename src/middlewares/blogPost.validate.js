const joi = require('joi');
const handleValidate = require('../utils/handleValidate');

const schema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().items(joi.number()).required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
});

const create = handleValidate(schema);

module.exports = { create };
