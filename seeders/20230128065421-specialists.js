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
   await queryInterface.bulkInsert('Specialists',[
    {
    specialist_name : 'Psychiatrist',
    createdAt : date,
    updatedAt : date
   },
   {
    specialist_name : 'Pulmonologist',
    createdAt : date,
    updatedAt : date
   },
   {
    specialist_name : 'Nefrologist',
    createdAt : date,
    updatedAt : date
   },
   {
    specialist_name : 'Orthopedic',
    createdAt : date,
    updatedAt : date
   },
   {
    specialist_name : 'Urologist',
    createdAt : date,
    updatedAt : date
   },
   {
    specialist_name : 'Oral Surgeon',
    createdAt : date,
    updatedAt : date
   },
   {
    specialist_name : 'Audiologist',
    createdAt : date,
    updatedAt : date
   },
   {
    specialist_name : 'Neurologist',
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
