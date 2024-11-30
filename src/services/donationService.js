import db from "../models/index.js";

let getAllDonations = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			let donations = "";
			if (id === "ALL") {
				donations = await db.Donation.findAll({
					include: [
						{
							model: db.User,
							as: "user",
							attributes: ["name"],
						},
						{
							model: db.Product,
							as: "product",
							attributes: ["name"],
						},
						{
							model: db.CartItem,
							as: "cartItem",
							attributes: ["status", "purchased_at"],
						}

					],
				});
			} else if (id) {
				donations = await db.Donation.findOne({
					where: { id },
					include: [
						{
							model: db.User,
							as: "user",
							attributes: ["name"],
						},

					],
				});
			}
			resolve(donations);
		} catch (error) {
			reject(error);
		}
	});
};
let createDonation = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			await db.Donation.create({
				user_id: data.user_id,
				product_id: data.product_id,
				cartItem_id: data.cartItem_id,
				total_amount: data.total_amount,
			});
			resolve({
				errCode: 0,
				errMessage: "Create a new donation successfully!",
			});
		} catch (error) {
			reject(error);
		}
	});
};
let deleteDonation = (donationId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let donation = await db.Donation.findOne({
				where: { id: donationId },
			});
			if (!donation) {
				resolve({
					errCode: 1,
					errMessage: "The donation isn't exist!",
				});
			}
			await db.Donation.destroy({
				where: { id: donationId },
			});
			resolve({
				errCode: 0,
				errMessage: "The donation is deleted!",
			});
		} catch (error) {
			reject(error);
		}
	});
};
let updateDonation = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let donation = await db.Donation.findOne({
				where: { id: data.id },
			});
			if (!donation) {
				//nếu không tìm thấy donation
				resolve({
					errCode: 1,
					errMessage: "The donation isn't exist!",
				});
			}
			await donation.update({
				user_id: data.user_id,
				total_amount: data.total_amount,
			});
			resolve({
				errCode: 0,
				errMessage: "Update donation successfully!",
			});
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	getAllDonations: getAllDonations,
	createDonation: createDonation,
	deleteDonation: deleteDonation,
	updateDonation: updateDonation,
};
