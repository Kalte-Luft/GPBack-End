"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Campaign extends Model {
        static associate(models) {
            // Một chiến dịch thuộc một tỉnh
            Campaign.belongsTo(models.Province, {
                foreignKey: "province_id",
                as: "province",
            });

            // Một chiến dịch có nhiều đối tác
            Campaign.hasMany(models.Partner, {
                foreignKey: "campaign_id",
                as: "partners",
            });

            // Một chiến dịch có nhiều hoạt động
            Campaign.hasMany(models.Activity, {
                foreignKey: "campaign_id",
                as: "activities",
            });

            // Một chiến dịch có nhiều khoản quyên góp
            Campaign.hasMany(models.CampaignDonation, {
                foreignKey: "campaign_id",
                as: "donations",
            });

            // Một chiến dịch có nhiều người tham gia
            Campaign.hasMany(models.Participant, {
                foreignKey: "campaign_id",
                as: "participants",
            });
        }
    }
    Campaign.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING,
            province_id: DataTypes.STRING,
            description: DataTypes.TEXT,
            status: DataTypes.ENUM("active", "completed", "upcoming"),
            image: DataTypes.TEXT,
            goal_amount: DataTypes.DECIMAL(15, 2),
            current_amount: DataTypes.DECIMAL(15, 2),
            start_date: DataTypes.DATE,
            end_date: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Campaign",
            tableName: "Campaigns",
        }
    );
    return Campaign;
};
