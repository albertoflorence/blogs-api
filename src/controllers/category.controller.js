const handleResponse = require('../utils/handleResponse');
const categoryService = require('../services/category.service');

async function create(req, res) {
  const result = await categoryService.create(req.body);
  handleResponse(res, result);
}

async function findAll(req, res) {
  const result = await categoryService.findAll();
  handleResponse(res, result);
}

module.exports = {
  create,
  findAll,
};
