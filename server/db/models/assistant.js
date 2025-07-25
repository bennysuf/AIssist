"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class assistant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      assistant.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
      });
      assistant.hasMany(models.prompt, {
        foreignKey: "prompt_id",
        as: "prompt",
      });
      assistant.hasMany(models.note, {
        foreignKey: "note_id",
        as: "note",
      });
    }
  }
  assistant.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: false },
      },
      apiKey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "companyName cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "assistant",
    }
  );
  return assistant;
};
