const userService = require('../services/user.service');
const handleResponse = require('../utils/handleResponse');

async function create(req, res) {
  const result = await userService.create(req.body);
  handleResponse(res, result);
}

module.exports = {
  create,
};
