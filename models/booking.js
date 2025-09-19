'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    vehicleId: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
  });

  Booking.associate = function (models) {
    Booking.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
  };

  return Booking;
};