'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appoinments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      specialist_id: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Specialists',
          key : 'id'
        }
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
          key : 'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
          key : 'id'
        }
      },
      payment_id: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Payments'
        }
      },
      schedules_id: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Schedules',
          key : 'id'
        }
      },
      appoinment_desc: {
        type: Sequelize.STRING
      },
      appoinment_time: {
        type: Sequelize.STRING
      },
      admin_fee: {
        type: Sequelize.INTEGER
      },
      ppn: {
        type: Sequelize.INTEGER
      },
      total_price: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Appoinments');
  }
};