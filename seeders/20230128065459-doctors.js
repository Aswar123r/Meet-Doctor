'use strict';
const {Hash} = require('../Helpers/Bcrypt.helper')
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
   await queryInterface.bulkInsert('Users', [
    {
      full_name: 'mahardika',
      email: 'mahardika@gmail.com',
      password: Hash('12345678'),
      role: 'doctor',
      specialist_id: 3,
      profile_desc: 'saya adalah seorang doktor yang sangat berpegalaman di bidang saya',
      whatsapp: '085123456789',
      price: 200000,
      rating: 0,
      createdAt : date,
      updatedAt : date
    },
    {
      full_name: 'sumarni',
      email: 'sumarni@gmail.com',
      password: Hash('12345678'),
      role: 'doctor',
      specialist_id: 2,
      profile_desc: 'saya adalah seorang doktor yang sangat berpegalaman di bidang saya',
      whatsapp: '085123456788',
      price: 1500000,
      rating: 4.5,
      createdAt : date,
      updatedAt : date
    },
    {
      full_name: 'windi kusuma',
      email: 'windikusuma@gmail.com',
      password: Hash('12345678'),
      role: 'doctor',
      specialist_id: 1,
      profile_desc: 'saya adalah seorang doktor yang sangat berpegalaman di bidang saya',
      whatsapp: '085123456779',
      price: 200000,
      rating: 1.2,
      createdAt : date,
      updatedAt : date
    },
    {
      full_name: 'sidik',
      email: 'sidik@gmail.com',
      password: Hash('12345678'),
      role: 'doctor',
      specialist_id: 3,
      profile_desc: 'saya adalah seorang doktor yang sangat berpegalaman di bidang saya',
      whatsapp: '085123456786',
      price: 300000,
      rating: 2.9,
      createdAt : date,
      updatedAt : date
    },
    {
      full_name: 'sukaku',
      email: 'sukaku@gmail.com',
      password: Hash('12345678'),
      role: 'doctor',
      specialist_id: 3,
      profile_desc: 'saya adalah seorang doktor yang sangat berpegalaman di bidang saya',
      whatsapp: '085123456781',
      price: 300000,
      rating: 2.9,
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
