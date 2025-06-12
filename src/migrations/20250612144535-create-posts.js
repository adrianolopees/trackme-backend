'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
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
          model: 'Users', // tabela referenciada
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT, // texto maior e opcional
        allowNull: true,
      },
      playlist_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Playlists', // FK opcional para Playlists (depois criaremos essa tabela)
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  },
};
// Esse arquivo cria a tabela Posts com os campos especificados, incluindo chaves estrangeiras para Users e Playlists.
// A tabela Posts tem um campo de texto opcional para conteúdo e um campo de título obrigatório.
// A migração também define o comportamento de atualização e exclusão para as chaves estrangeiras.
// A função up cria a tabela e a função down a remove, permitindo reverter a migração se necessário.
// Certifique-se de que as tabelas Users e Playlists existam antes de executar esta migração.
// Execute a migração com o comando: npx sequelize-cli db:migrate
// Para reverter a migração, use: npx sequelize-cli db:migrate:undo
// Lembre-se de que o Sequelize deve estar configurado corretamente no seu projeto para que as migrações funcionem.     