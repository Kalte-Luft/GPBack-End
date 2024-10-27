import express from 'express';
import userController from '../controllers/userController';
import homeController from '../controllers/homeController';
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

//api
    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-users", userController.handleGetAllUsers);  
    return app.use("/", router);
};
module.exports = initWebRoutes;
