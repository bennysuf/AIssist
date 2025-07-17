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
      apiKey: DataTypes.STRING,
      role: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      companyName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "assistant",
    }
  );
  return assistant;
};
