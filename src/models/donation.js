"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Donation extends Model {
        static associate(models) {
            // Mối quan hệ với bảng Users
            Donation.belongsTo(models.User, {
                foreignKey: "user_id",
                as: "user",
            });
            // Mối quan hệ với bảng CartItems
            Donation.belongsTo(models.CartItem, {
                foreignKey: "cartItem_id",
                as: "cartItem",
            });
            // Mối quan hệ với bảng Products
            Donation.belongsTo(models.Product, {
                foreignKey: "product_id",
                as: "product",
            });
        }
    }
    Donation.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: DataTypes.BIGINT,
            cartItem_id: DataTypes.BIGINT,
            product_id: DataTypes.BIGINT,
            total_amount: DataTypes.DECIMAL(20, 2) // Tổng số tiền của CartItem
        },
        {
            sequelize,
            modelName: "Donation",
            tableName: "Donations",
        }
    );

    return Donation;
};
