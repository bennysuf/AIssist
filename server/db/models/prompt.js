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
      assistant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: false },
      },
      promptType: { type: DataTypes.STRING, allowNull: false },
      promptText: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "prompt",
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }
    }
  );
  return prompt;
};
