'use strict';

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

    await queryInterface.bulkInsert('VehicleTypes', [
      { name: 'Hatchback', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'SUV', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sedan', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cruiser', wheels: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sports', wheels: 2, createdAt: new Date(), updatedAt: new Date() },
    ], {});

    await queryInterface.bulkInsert('Vehicles', [
      { model_name: 'Hyundai i20', vehicleTypeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { model_name: 'Toyota Fortuner', vehicleTypeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { model_name: 'Royal Enfield Classic', vehicleTypeId: 4, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Vehicles', null, {});
    await queryInterface.bulkDelete('VehicleType', null, {});

  }
};
