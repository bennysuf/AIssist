module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('assistants', [
      // User 1 — 1 assistant
      {
        apiKey: 'api-key-1a',
        role: 'Sales Assistant',
        companyName: 'Acme Corp',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // User 2 — 1 assistant
      {
        apiKey: 'api-key-2a',
        role: 'Tech Assistant',
        companyName: 'Beta Inc',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // User 3 — 2 assistants
      {
        apiKey: 'api-key-3a',
        role: 'Marketing Assistant',
        companyName: 'Gamma LLC',
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        apiKey: 'api-key-3b',
        role: 'HR Assistant',
        companyName: 'Gamma LLC',
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // User 4 — 2 assistants
      {
        apiKey: 'api-key-4a',
        role: 'Finance Assistant',
        companyName: 'Delta Solutions',
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        apiKey: 'api-key-4b',
        role: 'Admin Assistant',
        companyName: 'Delta Solutions',
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('assistants', null, {});
  },
};
