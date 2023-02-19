'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const date = new Date()
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Schedule_doctors', [
    {
    doctor_id : 2,
    schedule_id : 1,
    createdAt : date,
    updatedAt : date
   },
   {
    doctor_id : 2,
    schedule_id : 2,
    createdAt : date,
    updatedAt : date
   },
   {
    doctor_id : 5,
    schedule_id : 1,
    createdAt : date,
    updatedAt : date
   },
  {
    doctor_id : 1,
    schedule_id : 1,
    createdAt : date,
    updatedAt : date
   },
   {
    doctor_id : 1,
    schedule_id : 2,
    createdAt : date,
    updatedAt : date
   },
   {
    doctor_id : 1,
    schedule_id : 3,
    createdAt : date,
    updatedAt : date
   },
   {
    doctor_id : 1,
    schedule_id : 4,
    createdAt : date,
    updatedAt : date
   },
   {
    doctor_id : 1,
    schedule_id : 5,
    createdAt : date,
    updatedAt : date
   },
   {
    doctor_id : 3,
    schedule_id : 2,
    createdAt : date,
    updatedAt : date
   },
   {
    doctor_id : 3,
    schedule_id : 3,
    createdAt : date,
    updatedAt : date
   },
  {
    doctor_id : 4,
    schedule_id : 1,
    createdAt : date,
    updatedAt : date
   },
   {
    doctor_id : 4,
    schedule_id : 5,
    createdAt : date,
    updatedAt : date
   },
   {
    doctor_id : 5,
    schedule_id : 5,
    createdAt : date,
    updatedAt : date
   },
   {
    doctor_id : 5,
    schedule_id : 6,
    createdAt : date,
    updatedAt : date
   },
   {
    doctor_id : 5,
    schedule_id : 7,
    createdAt : date,
    updatedAt : date
   },
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
