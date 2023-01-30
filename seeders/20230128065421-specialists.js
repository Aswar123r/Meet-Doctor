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
    specialist_name : 'jangtung',
    createdAt : date,
    updatedAt : date
   },
   {
    specialist_name : 'organ dalam',
    createdAt : date,
    updatedAt : date
   },
   {
    specialist_name : 'kulit',
    createdAt : date,
    updatedAt : date
   },
   {
    specialist_name : 'paru-paru',
    createdAt : date,
    updatedAt : date
   },
   {
    specialist_name : 'organ tubuh',
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
