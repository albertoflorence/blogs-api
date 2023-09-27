const authService = require('../services/auth.service');
const handleResponse = require('../utils/handleResponse');

async function login(req, res) {
  const result = await authService.login(req.body);
  handleResponse(res, result);
}

module.exports = {
  login,
};
