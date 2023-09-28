const { Op } = require('sequelize');
const { BlogPost, Category, sequelize, PostCategory, User } = require('../models');
const {
  INTERNAL_ERROR,
  CREATED,
  NOT_FOUND,
  BAD_REQUEST,
  OK,
  NO_CONTENT,
} = require('../utils/codes');

const includeUser = {
  model: User,
  as: 'user',
  attributes: { exclude: ['password'] },
};
const includeCategories = {
  model: Category,
  as: 'categories',
  through: { attributes: [] },
};
const postNotFound = { code: NOT_FOUND, data: { message: 'Post does not exist' } };

async function create({ title, content, categoryIds, userId }) {
  const categories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  if (categories.length !== categoryIds.length) {
    return { code: BAD_REQUEST, data: { message: 'one or more "categoryIds" not found' } };
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

async function findAll({ userId, text }) {
  const where = { userId };
  if (text) {
    where[Op.or] = { title: { [Op.like]: `%${text}%` }, content: { [Op.like]: `%${text}%` } };
  }
  const posts = await BlogPost.findAll({
    where,
    include: [includeUser, includeCategories],
  });
  return { code: OK, data: posts };
}

async function findOne({ id }) {
  const post = await BlogPost.findByPk(id, { include: [includeUser, includeCategories] });
  if (!post) {
    return postNotFound;
  }
  return { code: OK, data: post };
}

async function update({ id, title, content }) {
  const post = await BlogPost.findByPk(id, { include: [includeUser, includeCategories] });
  post.title = title;
  post.content = content;
  await post.save();

  return { code: OK, data: post };
}

async function deleteOne({ id }) {
  const post = await BlogPost.findByPk(id);
  if (!post) return postNotFound;
  post.destroy();
  return { code: NO_CONTENT };
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
};
