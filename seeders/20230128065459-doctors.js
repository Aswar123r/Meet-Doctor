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
      full_name: 'dr. mahardika, Sp PD FINASIM',
      email: 'mahardika@gmail.com',
      password: Hash('12345678'),
      role: 'doctor',
      specialist_id: 3,
      profile_desc: 'i am a doctor who is very experienced in my field',
      whatsapp: '085123456789',
      price: 200000,
      rating: 0,
      createdAt : date,
      updatedAt : date
    },
    {
      full_name: 'dr. sumarni, Sp PD FINASIM',
      email: 'sumarni@gmail.com',
      password: Hash('12345678'),
      role: 'doctor',
      specialist_id: 2,
      profile_desc: 'i am a doctor who is very experienced in my field',
      whatsapp: '085123456788',
      price: 1500000,
      rating: 4.5,
      createdAt : date,
      updatedAt : date
    },
    {
      full_name: ' dr. windi kusuma, Sp PD FINASIM',
      email: 'windikusuma@gmail.com',
      password: Hash('12345678'),
      role: 'doctor',
      specialist_id: 1,
      profile_desc: 'i am a doctor who is very experienced in my field',
      whatsapp: '085123456779',
      price: 200000,
      rating: 1.2,
      createdAt : date,
      updatedAt : date
    },
    {
      full_name: 'dr. sidik, Sp PD FINASIM',
      email: 'sidik@gmail.com',
      password: Hash('12345678'),
      role: 'doctor',
      specialist_id: 3,
      profile_desc: 'i am a doctor who is very experienced in my field',
      whatsapp: '085123456786',
      price: 300000,
      rating: 2.9,
      createdAt : date,
      updatedAt : date
    },
    {
      full_name: 'dr. Yani Muvitasari, Sp PD FINASIM',
      email: 'sukaku@gmail.com',
      password: Hash('12345678'),
      role: 'doctor',
      specialist_id: 3,
      profile_desc: 'i am a doctor who is very experienced in my field',
      whatsapp: '085123456781',
      price: 300000,
      rating: 2.9,
      createdAt : date,
      updatedAt : date
    },
    //admin
    {
      full_name: 'Mansur Wirawan',
      email: 'admin@mydoctor.com',
      password: Hash('12345678'),
      role: 'admin',
      rating: 2.9,
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
