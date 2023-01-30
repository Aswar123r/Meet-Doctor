'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull : false
      },
      email: {
        type: Sequelize.STRING,
        unique : true,
        allowNull : false
      },
      password: {
        type: Sequelize.STRING,
        allowNull : false
      },
      role: {
        type: Sequelize.STRING,
        allowNull : false
      },
      specialist_id: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Specialists',
          key : 'id'
        }
      },
      profile_desc: {
        type: Sequelize.STRING
      },
      profile_picture: {
        type: Sequelize.STRING
      },
      whatsapp: {
        type: Sequelize.STRING,
        //unique : true
      },
      price: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};