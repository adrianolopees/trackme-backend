'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Playlists', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // tabela Users (a mesma que você tem no banco)
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // se o usuário for deletado, a playlist também some
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_public: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Playlists');
  },
};
// Esse arquivo cria a tabela Playlists com os campos especificados, incluindo uma chave estrangeira para Users.
// A tabela Playlists tem um campo de descrição opcional e um campo de nome obrigatório.  