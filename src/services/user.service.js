const { User } = require('../models');
const { CONFLICT, CREATED, OK, NOT_FOUND, NO_CONTENT } = require('../utils/codes');
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

async function findOne({ id }) {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) {
    return { code: NOT_FOUND, data: { message: 'User does not exist' } };
  }
  return { code: OK, data: user };
}

async function deleteOne({ userId }) {
  const user = await User.findByPk(userId);
  await user.destroy();
  return { code: NO_CONTENT };
}

module.exports = {
  create,
  findAll,
  findOne,
  deleteOne,
};
