import db from "../models/index.js";

let getAllCarts = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let carts = "";
            if (id === "ALL") {
                carts = await db.CartItem.findAll({
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
                    ],
                });
            } else if (id) {
                carts = await db.CartItem.findOne({
                    where: { id },
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
                    ],
                });
            }
            resolve(carts);
        } catch (error) {
            reject(error);
        }
    });
};
let createCart =  (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.CartItem.create({
                user_id: data.user_id,
                product_id: data.product_id,
                quantity: data.quantity,
                status: data.status,
                purchased_at: data.purchased_at,
            });
            resolve({
                errCode: 0,
                errMessage: "Create a new cart successfully!",
            });
        } catch (error) {
            reject(error);
        }
    });
};
let deleteCart =  (cartId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cart = await db.CartItem.findOne({
                where: { id: cartId },
            });
            if (!cart) {
                resolve({
                    errCode: 1,
                    errMessage: "The cart isn't exist!",
                });
            }
            await db.CartItem.destroy({
                where: { id: cartId },
            });
            resolve({
                errCode: 0,
                errMessage: "The cart is deleted!",
            });
        } catch (error) {
            reject(error);
        }
    });
};
let updateCart =  (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cart = await db.CartItem.findOne({
                where: { id: data.id },
            });
            if (!cart) {
                //nếu không tìm thấy cart
                resolve({
                    errCode: 1,
                    errMessage: "The cart isn't exist!",
                });
            }
            await cart.update({
                product_id: data.product_id,
                user_id: data.user_id,
                quantity: data.quantity,
                status: data.status,
                purchased_at: data.purchased_at,
            });
            resolve({
                errCode: 0,
                errMessage: "Update cart successfully!",
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllCarts: getAllCarts,
    createCart: createCart,
    deleteCart: deleteCart,
    updateCart: updateCart,
};
