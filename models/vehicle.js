'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vehicle.init({
    model_name: DataTypes.STRING,
    vehicleTypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vehicle',
  });

  Vehicle.associate = function (models) {
    Vehicle.belongsTo(models.VehicleType, { foreignKey: 'vehicleTypeId' });
    Vehicle.hasMany(models.Booking, { foreignKey: 'vehicleId' });
  };

  return Vehicle;
};