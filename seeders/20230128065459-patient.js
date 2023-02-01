"use strict";
const { Hash } = require("../Helpers/Bcrypt.helper");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const date = new Date();
    await queryInterface.bulkInsert("Users", [
      {
        full_name: "patient 1",
        email: "patient1@gmail.com",
        password: Hash("12345678"),
        role: "patient",
        specialist_id: null,
        profile_desc: "test",
        whatsapp: "085123456789",
        price: 0,
        rating: 0,
        createdAt: date,
        updatedAt: date,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
