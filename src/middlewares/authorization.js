const handleResponse = require('../utils/handleResponse');

const authService = require('../services/auth.service');
const authorizationService = require('../services/authorization.service');

async function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const authResult = await authService.validateToken(authorization.split(' ')[1]);
  if (authResult.code !== 200) return handleResponse(res, authResult);

  const authorizationResult = await authorizationService.user({
    ...authResult.data,
    id: req.params.id,
    route: req.baseUrl,
  });
  if (authorizationResult.code !== 200) return handleResponse(res, authorizationResult);

  req.locals = authResult.data;
  next();
}

module.exports = auth;
