const blogPostService = require('../services/blogPost.service');
const handleResponse = require('../utils/handleResponse');

async function create(req, res) {
  const result = await blogPostService.create({ ...req.body, ...req.locals });
  return handleResponse(res, result);
}

async function findAll(req, res) {
  const result = await blogPostService.findAll({ ...req.locals });
  return handleResponse(res, result);
}

async function findOne(req, res) {
  const result = await blogPostService.findOne(req.params);
  return handleResponse(res, result);
}

async function update(req, res) {
  const result = await blogPostService.update({ ...req.params, ...req.body, ...req.locals });
  return handleResponse(res, result);
}

async function deleteOne(req, res) {
  const result = await blogPostService.deleteOne({ ...req.params, ...req.locals });
  return handleResponse(res, result);
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
};
