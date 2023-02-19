'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const date = new Date()
   await queryInterface.bulkInsert('Schedules', [
    {
      date : 'Monday',
      time : '10:00 - 12:00',
      createdAt : date,
      updatedAt : date
    },
    {
      date : 'Tuesday',
      time : '09:00 - 11:00',
      createdAt : date,
      updatedAt : date
    },
    {
      date : 'Wednesday',
      time : '10:00 - 12:00',
      createdAt : date,
      updatedAt : date
    },
    {
      date : 'Thursday',
      time : '13:00 - 14:00',
      createdAt : date,
      updatedAt : date
    },
    {
      date : 'Friday',
      time : '13:00 - 14:00',
      createdAt : date,
      updatedAt : date
    },
    {
      date : 'Saturday',
      time : '13:00 - 14:00',
      createdAt : date,
      updatedAt : date
    },
    {
      date : 'Sunday',
      time : '13:00 - 14:00',
      createdAt : date,
      updatedAt : date
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
