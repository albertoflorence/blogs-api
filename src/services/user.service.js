const { User } = require('../models');
const { CONFLICT, CREATED } = require('../utils/codes');
const tokenize = require('../utils/token');

async function create({ email, displayName, password }) {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return { code: CONFLICT, data: { message: 'User already registered' } };
  }
  const { id } = await User.create({ email, password, displayName });
  const token = tokenize.generate({ userId: id });
  return { code: CREATED, data: { token } };
}

module.exports = {
  create,
};
