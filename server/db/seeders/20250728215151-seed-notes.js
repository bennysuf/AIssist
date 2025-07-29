"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("notes", [
      // Assistant 1
      {
        assistant_id: 1,
        noteName: "Meeting Notes",
        noteText: "Discuss Q3 roadmap.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        assistant_id: 1,
        noteName: "Reminder",
        noteText: "Follow up with the product team.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Assistant 2
      {
        assistant_id: 2,
        noteName: "Shopping List",
        noteText: "Buy coffee and snacks.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Assistant 3
      {
        assistant_id: 3,
        noteName: "Ideas",
        noteText: "Explore AI integrations.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        assistant_id: 3,
        noteName: "Book Notes",
        noteText: "Key takeaways from Atomic Habits.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Assistant 4
      {
        assistant_id: 4,
        noteName: "Daily Log",
        noteText: "Tracked progress on feature build.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("notes", null, {});
  },
};
