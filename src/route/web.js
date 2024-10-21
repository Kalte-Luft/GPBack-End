import express from 'express';
import homeController from '../controllers/homeController';
let router = express.Router();
let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getAboutPage);
    router.get("/signin", homeController.getSignInPage);
    router.get("/signup", homeController.getSignUpPage);
    router.post("/post-crud", homeController.postCRUD);
    //rest api
    return app.use("/", router);
};
module.exports = initWebRoutes;
