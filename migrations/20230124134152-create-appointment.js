"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Appointments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      specialist_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Specialists",
          key: "id",
        },
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      schedule_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Schedules",
          key: "id",
        },
      },
      appointment_desc: {
        type: Sequelize.STRING,
      },
      appointment_time: {
        type: Sequelize.STRING,
      },
      total_price: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.STRING,
      },
      url_midtrans: {
        type: Sequelize.STRING,
      },
      token_midtrans: {
        type: Sequelize.STRING,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Appointments");
  },
};
