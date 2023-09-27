const { Category } = require('../models');
const { CREATED, OK } = require('../utils/codes');

async function create({ name }) {
  const { id } = await Category.create({ name });
  return { code: CREATED, data: { name, id } };
}

async function findAll() {
  const categories = await Category.findAll();
  return { code: OK, data: categories };
}

module.exports = {
  create,
  findAll,
};
