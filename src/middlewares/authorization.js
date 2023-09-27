const handleResponse = require('../utils/handleResponse');

const authService = require('../services/auth.service');

async function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = authorization.split(' ')[1];
  const result = await authService.validateToken(token);
  if (result) {
    return handleResponse(res, result);
  }
  next();
}

module.exports = auth;
