'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Todo = sequelize.define('Todo', {

  // }, {});
  class Todo extends sequelize.Sequelize.Model { }
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `the title must be not null`
        },
        notEmpty: {
          msg: `the title must be not empty`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `the description must be not null`
        },
        notEmpty: {
          msg: `the description must be not empty`
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        isIn: [[true, false]],
        notNull: {
          msg: `the description must be not null`
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelize.Sequelize.User,
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: "Todo"
  })
  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};