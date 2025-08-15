"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const AppError = require("../../utils/appError");

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
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "firstName cannot be null" },
          notEmpty: { msg: "firstName cannot be empty" },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "lastName cannot be null" },
          notEmpty: { msg: "lastName cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "unique_email",
          msg: "Email already in use",
        },
        validate: {
          notNull: { msg: "email cannot be null" },
          notEmpty: { msg: "email cannot be empty" },
          isEmail: { msg: "Invalid email" },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Phone number cannot be null" },
          is: {
            args: /^[0-9]{10,15}$/, // Only digits, length 10-15
            msg: "Please enter a valid phone number",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "password cannot be null" },
          notEmpty: { msg: "password cannot be empty" },
        },
      },
      confirmPassword: {
        type: DataTypes.VIRTUAL,
        set(value) {
          if (this.password.length < 7) {
            throw new AppError("Password length must be greater than 7", 400);
          }
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
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }
    }
  );
  return user;
};
