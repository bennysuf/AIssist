"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const AppError = require("../../utils/appError")

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.assistant, {
        foreignKey: "user_id",
        as: "assistants",
      });
    }
  }
  user.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      password: DataTypes.STRING,
      confirmPassword: {
        type: DataTypes.VIRTUAL,
        set(value) {
          if (value === this.password) {
            const hashPassword = bcrypt.hashSync(value, 10);
            this.setDataValue("password", hashPassword);
          } else {
            throw new AppError(
              "Password and confirm password don't match",
              400
            );
          }
        },
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
