'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:(queryInterface, Sequelize) => {
   return queryInterface.createTable('movies', {
     id: {
       type: Sequelize.INTEGER,
       allowNull: false,
       autoIncrement: true,
       primaryKey: true,
     },
     title: {
       type: Sequelize.STRING,
       allowNull: false,
     },
     genre: {
       type: Sequelize.STRING,
       allowNull: false,
     },
     releaseDate: {
       type: Sequelize.DATE,
       allowNull: false,
     },
     language: {
       type: Sequelize.STRING,
       allowNull: false,
     },
     rating: {
       type: Sequelize.INTEGER,
       allowNull: true,
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

  down:(queryInterface, Sequelize) => {
    return queryInterface.dropTable('movies');
  }
};
