import db from "../models/index.js";

let getAllProducts = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = "";
            if (id === "ALL") {
                products = await db.Product.findAll({});
            } else if (id) {
                products = await db.Product.findOne({
                    where: { id }
                });
            }
            resolve(products);
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    getAllProducts: getAllProducts,
};
