'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, {
        foreignKey : 'specialist_id'
      })
      this.hasMany(models.Appoinment, {
        foreignKey : 'specialist_id'
      })
    }
  }
  Specialist.init({
    specialist_name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : true,
      }
    }
  }, {
    sequelize,
    modelName: 'Specialist',
  });
  return Specialist;
};