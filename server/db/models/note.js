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
      callerName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Caller name cannot be null" },
        },
      },
      // callerPhone: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // validate: {
      //   notNull: { msg: "Phone number cannot be null" },
      //   is: {
      //     args: /^[0-9]{10,15}$/, // Only digits, length 10-15
      //     msg: "Please enter a valid phone number",
      //   },
      // },
      // },
      noteText: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Note text cannot be null" },
        },
      },
      noteSummery: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Note summery cannot be null" },
        },
      },
      markedRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { msg: "Marked read cannot be null" },
        },
      },
    },
    {
      sequelize,
      modelName: "note",
      defaultScope: {
        attributes: { exclude: ["updatedAt"] },
      },
    }
  );
  return note;
};
