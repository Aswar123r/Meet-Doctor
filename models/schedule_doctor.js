'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule_doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Schedule_doctor.init({
    doctor_id: DataTypes.INTEGER,
    schedule_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Schedule_doctor',
  });
  return Schedule_doctor;
};