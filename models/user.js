'use strict';
const { encryptPassword } = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  // const User = sequelize.define('User', {

  // }, {});

  class User extends sequelize.Sequelize.Model { }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: `the email must be not null`
        },
        notEmpty: {
          msg: `the email must be not empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `the password must be not null`
        },
        notEmpty: {
          msg: `the password must be not empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate(user, options) {
        user.password = encryptPassword(user.password)
      }
    }
  })
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};