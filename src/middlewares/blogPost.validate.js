const joi = require('joi');
const handleValidate = require('../utils/handleValidate');

const title = joi.string().required();
const content = joi.string().required();
const categoryIds = joi.array().items(joi.number()).required();

const messages = {
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
};

const create = handleValidate(joi.object({ title, content, categoryIds }).messages(messages));
const update = handleValidate(joi.object({ title, content }).messages(messages));

module.exports = { create, update };
