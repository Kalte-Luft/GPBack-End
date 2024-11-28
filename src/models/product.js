"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Product extends Model { }
	Product.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 0, // Đảm bảo số lượng không âm
				},
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
				validate: {
					min: 0, // Đảm bảo giá không âm
				},
			},
			description: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "Product",
			tableName: "Products",
		}
	);

	Product.associate = (models) => {
		Product.belongsToMany(models.Donation, {
			through: "DonationProducts",
			foreignKey: "product_id",
		});
	};

	return Product;
};
