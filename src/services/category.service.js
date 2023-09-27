const { Category } = require('../models');
const { CREATED } = require('../utils/codes');

async function create({ name }) {
  const { id } = await Category.create({ name });
  return { code: CREATED, data: { name, id } };
}

module.exports = {
  create,
};
