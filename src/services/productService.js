import db from "../models/index";

let getProductById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: { id },
                attributes: ["id", "name", "quantity", "price"],
            });

            if (!product) {
                return resolve({
                    errCode: 1,
                    message: "Product not found",
                });
            }

            resolve({
                errCode: 0,
                message: "Product retrieved successfully!",
                product,
            });
        } catch (error) {
            reject(error);
        }
    });
};

let getAllProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll(); // Giả sử bạn có model Product để truy vấn
            resolve(products);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllProducts,
    // Các hàm khác...
};


module.exports = {
    getProductById,
    getAllProducts,
};
