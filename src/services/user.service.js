const { User } = require('../models');
const { CONFLICT, CREATED, OK } = require('../utils/codes');
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

async function findAll() {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { code: OK, data: users };
}

module.exports = {
  create,
  findAll,
};
