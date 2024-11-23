"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Participant extends Model {
        static associate(models) {
            // Một người tham gia thuộc về một chiến dịch
            Participant.belongsTo(models.Campaign, {
                foreignKey: "campaign_id",
                as: "campaign",
            });
        }
    }
    Participant.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            campaign_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Participant",
            tableName: "Participants",
        }
    );
    return Participant;
};
