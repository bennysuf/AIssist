'use strict';
const {
  Model
} = require('sequelize');
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
  note.init({
    assistant_id: DataTypes.INTEGER,
    noteName: DataTypes.STRING,
    noteText: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'note',
  });
  return note;
};