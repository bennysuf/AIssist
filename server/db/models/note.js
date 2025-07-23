"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      note.belongsTo(models.assistant, {
        foreignKey: "assistant_id",
        as: "assistant",
        onDelete: "CASCADE",
      });
    }
  }
  note.init(
    {
      assistant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: false },
      },
      noteName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noteText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "note",
    }
  );
  return note;
};
