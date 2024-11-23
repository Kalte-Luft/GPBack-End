'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    static associate(models) {
      // Một tỉnh có nhiều chiến dịch
      Province.hasMany(models.Campaign, { foreignKey: 'province_id', as: 'campaigns' });
    }
  };
  Province.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    total_campaigns: DataTypes.INTEGER,
    active_campaigns: DataTypes.INTEGER,
    completed_campaigns: DataTypes.INTEGER,
    upcoming_campaigns: DataTypes.INTEGER,
    total_donations: DataTypes.DECIMAL(15, 2)
  }, {
    sequelize,
    modelName: 'Province',
    tableName: 'Provinces',
  });
  return Province;
};
