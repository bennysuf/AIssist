"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("notes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      assistant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "assistants",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      callerName: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      noteText: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      noteSummery: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      markedRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("notes");
  },
};
