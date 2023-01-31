"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Appointments, {
        foreignKey: "payment_id",
      });
    }
  }
  Payments.init(
    {
      payment_method: DataTypes.STRING,
      admin_fee: DataTypes.DOUBLE,
      ppn: DataTypes.INTEGER,
      discount: DataTypes.DOUBLE,
      total_amount_paid: DataTypes.DOUBLE,
      date_paid: DataTypes.DATE,
      payment_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Payments",
    }
  );
  return Payments;
};
