"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "doctor_id",
      });
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      this.belongsTo(models.Specialist, {
        foreignKey: "specialist_id",
      });
      this.belongsTo(models.Payments, {
        foreignKey: "payment_id",
      });
      this.belongsTo(models.Schedules, {
        foreignKey: "schedule_id",
      });
    }
  }
  Appointment.init(
    {
      specialist_id: DataTypes.INTEGER,
      doctor_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      payment_id: DataTypes.INTEGER,
      schedule_id: DataTypes.INTEGER,
      appointment_desc: DataTypes.STRING,
      appointment_time: DataTypes.STRING,
      total_price: DataTypes.DOUBLE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Appointments",
    }
  );
  return Appointment;
};
