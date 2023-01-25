'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appoinment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appoinment.init({
    specialist_id: DataTypes.INTEGER,
    doctor_id: DataTypes.INTEGER,
    payment_id: DataTypes.INTEGER,
    schedules_id: DataTypes.INTEGER,
    appoinment_desc: DataTypes.STRING,
    appoinment_time: DataTypes.STRING,
    admin_fee: DataTypes.INTEGER,
    ppn: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appoinment',
  });
  return Appoinment;
};