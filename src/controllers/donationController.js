import donationService from "../services/donationService";
import productService from "../services/productService";


let handleGetAllProducts = async (req, res) => {
    try {
        let products = await productService.getAllProducts();
        return res.status(200).json({
            errCode: 0,
            message: "OK",
            products
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: "Error from server",
            error
        });
    }
};

let handleGetProductDetails = async (req, res) => {
    try {
        let id = req.query.id; // Lấy id từ query params
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                message: "Missing required parameter: id"
            });
        }
        let product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({
                errCode: 1,
                message: "Product not found"
            });
        }
        return res.status(200).json({
            errCode: 0,
            message: "OK",
            product
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: "Error from server",
            error
        });
    }
};

let handleGetAllDonations = async (req, res) => {
    try {
        let userId = req.query.userId; // Lấy userId từ query params
        if (!userId) {
            return res.status(400).json({
                errCode: 1,
                message: "Missing required parameter: userId",
                donations: []
            });
        }
        let donations = await donationService.getAllDonations(userId);
        return res.status(200).json({
            errCode: 0,
            message: "OK",
            donations
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: "Error from server",
            error
        });
    }
};

let handleCreateDonation = async (req, res) => {
    try {
        let donationData = req.body;
        let message = await donationService.createDonation(donationData);
        return res.status(201).json({
            errCode: 0,
            message: "Donation created successfully",
            donation: message
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: "Error from server",
			error
        });
    }
};

let handleGetDonationDetails = async (req, res) => {
    try {
        let id = req.query.id; // Lấy id từ query params
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                message: "Missing required parameter: id"
            });
        }
        let donation = await donationService.getDonationById(id);
        if (!donation) {
            return res.status(404).json({
                errCode: 1,
                message: "Donation not found"
            });
        }
        return res.status(200).json({
            errCode: 0,
            message: "OK",
            donation
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: "Error from server",
            error
        });
    }
};

let handleUpdateDonation = async (req, res) => {
    try {
        let donationData = req.body;
        let message = await donationService.updateDonation(donationData);
        return res.status(200).json({
            errCode: 0,
            message: "Donation updated successfully",
            donation: message
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: "Error from server",
            error
        });
    }
};

let handleDeleteDonation = async (req, res) => {
    try {
        let id = req.body.id;
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                message: "Missing required parameter: id",
            });
        }
        let message = await donationService.deleteDonation(id);
        return res.status(200).json({
            errCode: 0,
            message: "Donation deleted successfully",
            result: message
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: "Error from server",
            error
        });
    }
};

module.exports = {
	handleGetAllProducts,
	handleGetProductDetails,
    handleGetAllDonations,
    handleCreateDonation,
    handleGetDonationDetails,
    handleUpdateDonation,
    handleDeleteDonation,
};
