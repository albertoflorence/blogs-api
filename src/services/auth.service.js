const { User } = require('../models');
const { BAD_REQUEST, OK } = require('../utils/codes');
const tokenize = require('../utils/token');

async function login({ email, password }) {
  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    return { code: BAD_REQUEST, data: { message: 'Invalid fields' } };
  }

  const token = tokenize.generate({ user });
  return { code: OK, data: { token } };
}

module.exports = {
  login,
};
