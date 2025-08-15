"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("notes", [
      // Assistant 1
      {
        assistant_id: 1,
        callerName: "Steve",
        noteText: "Discuss Q3 roadmap.",
        noteSummery: "Meeting Notes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        assistant_id: 1,
        callerName: "Bob Burger",
        noteText: "Follow up with the product team.",
        noteSummery: "Reminder",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Assistant 2
      {
        assistant_id: 2,
        callerName: "Kyle Ordeal",
        noteText: "Buy coffee and snacks.",
        noteSummery: "Shopping List",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Assistant 3
      {
        assistant_id: 3,
        callerName: "Big Pops",
        noteText: "Explore AI integrations.",
        noteSummery: "Ideas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        assistant_id: 3,
        callerName: "Randy Marsh",
        noteText: "Key takeaways from Atomic Habits.",
        noteSummery: "Book Notes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Assistant 4
      {
        assistant_id: 4,
        callerName: "Malinda Cooper",
        noteText: "Tracked progress on feature build.",
        noteSummery: "Daily Log",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("notes", null, {});
  },
};
