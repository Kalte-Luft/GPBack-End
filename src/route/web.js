import express from 'express';
import userController from '../controllers/userController';
import homeController from '../controllers/homeController';
import campaignController from '../controllers/campaignController';
import provinceController from '../controllers/provinceController';
import partnerController from '../controllers/partnerController';
import donationController  from '../controllers/donationController'; 


let router = express.Router();
let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getAboutPage);
    router.get("/signin", homeController.getSignInPage);
    router.get("/signup", homeController.getSignUpPage);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.displayGetCRUD);
    router.get("/edit-crud", homeController.getEditCRUD);
    router.post("/put-crud", homeController.putCRUD);
    router.get("/delete-crud", homeController.deleteCRUD);

    //api user
    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.post("/api/create-new-user", userController.handleCreateNewUser);
    router.put("/api/edit-user", userController.handleEditUser);
    router.delete("/api/delete-user", userController.handleDeleteUser);

    //api campaign
    router.get("/api/get-all-campaigns", campaignController.handleGetAllCampaigns);
    router.post("/api/create-campaign", campaignController.handleCreateCampaign);
    router.put("/api/update-campaign", campaignController.handleUpdateCampaign);
    router.delete("/api/delete-campaign", campaignController.handleDeleteCampaign);

    //api province
    router.get("/api/get-all-provinces", provinceController.handleGetAllProvinces);

    //api partner
    router.get("/api/get-all-partners", partnerController.handleGetAllPartners);
    router.post("/api/create-partner", partnerController.handleCreatePartner);
    router.put("/api/update-partner", partnerController.handleUpdatePartner);
    router.delete("/api/delete-partner", partnerController.handleDeletePartner);



    // api donation

    router.get("/api/get-all-donations", donationController.handleGetAllDonations);
    router.get("/api/get-donation-details", donationController.handleGetDonationDetails);
    router.post("/api/create-donation", donationController.handleCreateDonation);
    router.put("/api/update-donation", donationController.handleUpdateDonation);
    router.delete("/api/delete-donation", donationController.handleDeleteDonation);


    //api product
    router.get("/api/get-all-products", donationController.handleGetAllProducts);
    router.get("/api/get-product-details", donationController.handleGetProductDetails);

    return app.use("/", router);

};
module.exports = initWebRoutes;
