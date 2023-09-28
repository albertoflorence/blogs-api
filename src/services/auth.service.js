const { User } = require('../models');
const { BAD_REQUEST, OK, UNAUTHORIZED } = require('../utils/codes');
const tokenize = require('../utils/token');

async function login({ email, password }) {
  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    return { code: BAD_REQUEST, data: { message: 'Invalid fields' } };
  }

  const token = tokenize.generate({ userId: user.id });
  return { code: OK, data: { token } };
}

async function validateToken(token) {
  const result = tokenize.decode(token);
  if (!result) {
    return { code: UNAUTHORIZED, data: { message: 'Expired or invalid token' } };
  }

  return { code: OK, data: { userId: result.userId } };
}
module.exports = {
  login,
  validateToken,
};
