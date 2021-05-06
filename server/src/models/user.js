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
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      required: true,
      isUUID: 4
    },
    accessToken: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
      isEmail: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    emailToken: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    emailTokenExpires: {
      type: DataTypes.DATE,
      defaultValue: null
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};