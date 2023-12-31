const joi = require('joi');
const handleValidate = require('../utils/handleValidate');

const schema = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  image: joi.string(),
});

const create = handleValidate(schema);

module.exports = { create };
