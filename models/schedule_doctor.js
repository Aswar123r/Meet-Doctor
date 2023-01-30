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
      this.belongsTo(models.User, {
        foreignKey : 'doctor_id'
      })
      this.belongsTo(models.Schedules, {
        foreignKey : 'schedule_id'
      })
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