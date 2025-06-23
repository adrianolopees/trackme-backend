// src/migrations/YYYYMMDDHHMMSS-create-post.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Post', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      img: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
      caption: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      visibility: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      playlistId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Playlist',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      profileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Profile',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Post');
  },
};