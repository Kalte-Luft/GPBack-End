"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Donation extends Model { }
	Donation.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			total_amount: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				references: {
					model: "Users", // Tên bảng Users
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			product_details: {
				type: DataTypes.JSON,
				allowNull: false,
			},
			qr_code: {
				type: DataTypes.STRING, // Trường để lưu trữ mã QR
				allowNull: true, // Để null nếu chưa có mã QR
			},
		},
		{
			sequelize,
			modelName: "Donation",
			tableName: "Donations",
			timestamps: true, // Bật tính năng timestamps để tự động tạo createdAt và updatedAt
		}
	);
	return Donation;
};
