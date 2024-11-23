'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate(models) {
      // Một hoạt động thuộc về một chiến dịch
      Activity.belongsTo(models.Campaign, { foreignKey: 'campaign_id', as: 'campaign' });
    }
  };
  Activity.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    campaign_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Activity',
    tableName: 'Activities',
  });
  return Activity;
};
