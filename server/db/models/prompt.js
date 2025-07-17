"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class prompt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      prompt.belongsTo(models.assistant, {
        foreignKey: "assistant_id",
        as: "assistant",
        onDelete: "CASCADE",
      });
    }
  }
  prompt.init(
    {
      assistant_id: DataTypes.INTEGER,
      promptType: DataTypes.STRING,
      promptText: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "prompt",
    }
  );
  return prompt;
};
