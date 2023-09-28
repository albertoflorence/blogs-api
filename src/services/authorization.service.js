const models = require('../models');
const { UNAUTHORIZED } = require('../utils/codes');

const routeToModel = {
  '/users': 'User',
  '/categories': 'Category',
  '/post': 'BlogPost',
};

async function user({ userId, id, route }) {
  const OK = { code: 200, data: { userId } };
  const modelName = routeToModel[route];
  if (!modelName) return OK;
  const result = await models[modelName].findByPk(id);
  if (!result || !result.userId) return OK;
  if (result.userId !== userId) {
    return { code: UNAUTHORIZED, data: { message: 'Unauthorized user' } };
  }
  return OK;
}

module.exports = { user };
