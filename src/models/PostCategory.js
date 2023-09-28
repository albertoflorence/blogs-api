/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const model = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    { timestamps: false, tableName: 'posts_categories', underscored: true },
  );

  PostCategory.associate = ({ BlogPost, Category }) => {
    BlogPost.belongsToMany(Category, {
      foreignKey: 'postId',
      as: 'category',
      through: PostCategory,
    });

    Category.belongsToMany(BlogPost, {
      foreignKey: 'categoryId',
      as: 'blogPosts',
      through: PostCategory,
    });
  };

  return PostCategory;
};

module.exports = model;
