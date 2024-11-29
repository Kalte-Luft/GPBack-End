import productService from "../services/productService";

let handleGetAllProducts = async (req, res) => {
    try {
        let id = req.query.id; // Lấy id từ query params
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                message: "Missing required parameter!",
                products: []
            });
        }
        let products = await productService.getAllProducts(id);
        return res.status(200).json({
            errCode: 0,
            message: "OK",
            products
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: "Error from server",
            console: error
        });
    }
};


module.exports = {
    handleGetAllProducts
};
