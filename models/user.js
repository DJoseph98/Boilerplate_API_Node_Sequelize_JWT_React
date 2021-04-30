'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    userId: {
      type: DataTypes.UUID,
      unique: true,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      default: null
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      default: null
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};