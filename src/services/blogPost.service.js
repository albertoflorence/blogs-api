const { Op } = require('sequelize');
const { BlogPost, Category, sequelize, PostCategory, User } = require('../models');
const { INTERNAL_ERROR, CREATED } = require('../utils/codes');

async function create({ title, content, categoryIds, userId }) {
  const categories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  if (categories.length !== categoryIds.length) {
    return { code: 400, data: { message: 'one or more "categoryIds" not found' } };
  }
  const transaction = await sequelize.transaction();
  try {
    const post = await BlogPost.create({ title, content, userId }, { transaction });
    const promises = categories.map(({ id }) =>
      PostCategory.create({ postId: post.id, categoryId: id }, { transaction }));
    await Promise.all(promises);
    await transaction.commit();
    return { code: CREATED, data: post };
  } catch (error) {
    console.log('error: ', error);
    await transaction.rollback();
    return { code: INTERNAL_ERROR, data: { message: 'Internal Server Error' } };
  }
}

async function findAll({ userId }) {
  const posts = await BlogPost.findAll({
    where: { userId },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
      attributes: ['id', 'name'],
    }],
  });

  return { code: 200, data: posts };
}

module.exports = {
  create,
  findAll,
};
