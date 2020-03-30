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
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    }
  }, {
    sequelize,
    modelName: "Todo"
  })
  Todo.associate = function (models) {
    // associations can be defined here
  };
  return Todo;
};