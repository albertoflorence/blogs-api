const handleResponse = require('../utils/handleResponse');

const authService = require('../services/auth.service');

async function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = authorization.split(' ')[1];
  const { code, data } = await authService.validateToken(token);
  if (code !== 200) {
    return handleResponse(res, { code, data });
  }
  req.locals = data;
  next();
}

module.exports = auth;
