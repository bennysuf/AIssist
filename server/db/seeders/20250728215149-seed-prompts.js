"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("prompts", [
      {
        assistant_id: 1,
        promptType: "greeting",
        promptText: "Hello! How can I assist you today?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        assistant_id: 2,
        promptType: "summary",
        promptText: "Here's a quick summary of your task.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        assistant_id: 3,
        promptType: "reminder",
        promptText: "Don't forget to check your messages.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        assistant_id: 4,
        promptType: "follow-up",
        promptText: "Is there anything else I can help with?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("prompts", null, {});
  },
};
