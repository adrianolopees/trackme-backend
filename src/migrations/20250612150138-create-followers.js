'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Follows', {
      follower_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      following_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      followed_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      }
    });
    await queryInterface.addConstraint('Follows', {
      fields: ['follower_id', 'following_id'],
      type: 'primary key',
      name: 'follows_pkey'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Follows');
  }
};
