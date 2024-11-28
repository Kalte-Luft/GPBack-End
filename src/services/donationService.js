import db from "../models/index";

let getAllDonations = (userId = null) => {
    return new Promise(async (resolve, reject) => {
        try {
            let queryOptions = {
                include: [
                    {
                        model: db.User,
                        as: "user",
                        attributes: ["name", "email"]
                    },
                    {
                        model: db.Product,
                        as: "product",
                        attributes: ["name", "quantity", "price"]
                    }
                ]
            };

            if (userId) {
                queryOptions.where = { user_id: userId };
            }

            let donations = await db.Donation.findAll(queryOptions);
            
            resolve({
                errCode: 0,
                message: "Donations retrieved successfully!",
                donations,
            });
        } catch (error) {
            reject(error);
        }
    });
};


let createDonation = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newDonation = await db.Donation.create({
                user_id: data.user_id,
                product_id: data.product_id,
                amount: data.amount,
                total_price: data.total_price,
                message: data.message || "",
                date: data.date || new Date(), // Set default date to current time if not provided
            });

            // Update the product quantity after donation
            let product = await db.Product.findOne({ where: { id: data.product_id } });
            if (product) {
                await product.update({
                    quantity: product.quantity - data.amount,
                });
            }

            resolve({
                errCode: 0,
                message: "Donation created successfully!",
                donation: newDonation,
            });
        } catch (error) {
            reject(error);
        }
    });
};

let getDonationById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let donation = await db.Donation.findOne({
                where: { id },
                include: [
                    {
                        model: db.User,
                        as: "user",
                        attributes: ["name", "email"]
                    },
                    {
                        model: db.Product,
                        as: "product",
                        attributes: ["name", "quantity", "price"]
                    }
                ],
            });
            if (!donation) {
                resolve({
                    errCode: 1,
                    message: "Donation not found!",
                });
            } else {
                resolve({
                    errCode: 0,
                    message: "Donation found successfully!",
                    donation,
                });
            }
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
                    message: "Donation not found!",
                });
            }

            // Update donation details
            await donation.update({
                amount: data.amount,
                total_price: data.total_price,
                message: data.message || donation.message,
                date: data.date || donation.date, // Keep the existing date if not provided
            });

            resolve({
                errCode: 0,
                message: "Donation updated successfully!",
                donation,
            });
        } catch (error) {
            reject(error);
        }
    });
};

let deleteDonation = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let donation = await db.Donation.findOne({ where: { id } });
            if (!donation) {
                resolve({
                    errCode: 1,
                    message: "Donation not found!",
                });
            }

            await db.Donation.destroy({ where: { id } });

            // Optionally, update the product quantity if needed after deletion
            let product = await db.Product.findOne({ where: { id: donation.product_id } });
            if (product) {
                await product.update({
                    quantity: product.quantity + donation.amount,
                });
            }

            resolve({
                errCode: 0,
                message: "Donation deleted successfully!",
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllDonations,
    createDonation,
    getDonationById,
    updateDonation,
    deleteDonation,
};
