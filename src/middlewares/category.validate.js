const joi = require('joi');
const handleValidate = require('../utils/handleValidate');

const schema = joi.object({
  name: joi.string().required(),
});

const create = handleValidate(schema);

module.exports = { create };
