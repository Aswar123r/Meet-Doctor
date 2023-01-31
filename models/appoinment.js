"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appoinment extends Model {
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
      this.belongsTo(models.Payment, {
        foreignKey: "payment_id",
      });
      this.belongsTo(models.Schedules, {
        foreignKey : 'schedule_id'
      })
    }
  }
  Appoinment.init(
    {
      specialist_id: DataTypes.INTEGER,
      doctor_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      payment_id: DataTypes.INTEGER,
      schedules_id: DataTypes.INTEGER,
      appoinment_desc: DataTypes.STRING,
      appoinment_time: DataTypes.STRING,
      admin_fee: DataTypes.INTEGER,
      ppn: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Appoinment",
    }
  );
  return Appoinment;
};
