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
							attributes: ["total"],
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
			// Lấy thông tin CartItem
			let cartItem = await db.CartItem.findOne({
				where: { id: data.cartItem_id },
				include: [{
					model: db.Product,
					as: "product",
					attributes: ["name", "price"], // Lấy name và price sản phẩm
				}],
			});

			if (!cartItem) {
				return resolve({
					errCode: 1,
					errMessage: "CartItem not found!"
				});
			}
			// Tính toán total_amount (bao gồm thêm 10% giá trị từ CartItem)
			let total_amount = cartItem.total * 1.1; // Cộng thêm 10%

			// Tạo mới Donation với thông tin từ CartItem và Product
			await db.Donation.create({
				user_id: data.user_id,
				product_id: cartItem.product_id,
				cartItem_id: data.cartItem_id,
				product_name: cartItem.product.name, // Lưu tên sản phẩm
				product_image: cartItem.product.image, // Lưu ảnh sản phẩm
				total_amount: total_amount, // Lưu tổng số tiền (cộng thêm 10%)
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
                resolve({
                    errCode: 1,
                    errMessage: "The donation isn't exist!",
                });
            }

            // Lấy thông tin CartItem
            let cartItem = await db.CartItem.findOne({
                where: { id: data.cartItem_id },
                include: [{
                    model: db.Product,
                    as: "product",
                    attributes: ["name", "price"], // Lấy name và price của sản phẩm
                }],
            });

            if (!cartItem) {
                return resolve({
                    errCode: 1,
                    errMessage: "Cart item not found!",
                });
            }

            // Tính toán lại total_amount (bao gồm thêm 10%)
            let total_amount = cartItem.total * 1.1; // Cộng thêm 10%

            // Cập nhật Donation với thông tin mới
            await donation.update({
                user_id: data.user_id,
                product_id: cartItem.product_id,
                cartItem_id: data.cartItem_id,
                product_name: cartItem.product.name, // Cập nhật tên sản phẩm
                product_image: cartItem.product.image, // Cập nhật ảnh sản phẩm
                total_amount: total_amount, // Cập nhật tổng số tiền (cộng thêm 10%)
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
