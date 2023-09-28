const userService = require('../services/user.service');
const handleResponse = require('../utils/handleResponse');

async function create(req, res) {
  const result = await userService.create(req.body);
  handleResponse(res, result);
}

async function findAll(req, res) {
  const result = await userService.findAll();
  handleResponse(res, result);
}

async function findOne(req, res) {
  const result = await userService.findOne(req.params);
  handleResponse(res, result);
}

async function deleteOne(req, res) {
  const result = await userService.deleteOne(req.locals);
  handleResponse(res, result);
}

module.exports = {
  create,
  findAll,
  findOne,
  deleteOne,
};
