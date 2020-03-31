'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Todos', 'UserId', Sequelize.INTEGER)
      .then(() => queryInterface.addConstraint('Todos', ['UserId'], {
        type: 'FOREIGN KEY',
        name: 'FK_userId_todo',
        references: {
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'

      }))
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Todos', 'FK_userId_todo', {})
      .then(() => queryInterface.removeColumn('Todos', 'UserId', {}))
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
