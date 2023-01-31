"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      payment_method: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      payment_status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "UNPAID",
      },
      admin_fee: {
        allowNull: false,
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      ppn: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      discount: {
        allowNull: false,
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      total_amount_paid: {
        allowNull: false,
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      date_paid: {
        allowNull: false,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Payments");
  },
};
