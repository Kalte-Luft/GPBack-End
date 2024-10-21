import db from "../models/index.js";
import CRUDService from "../services/CRUDService.js";
let getHomePage = async(reg,res) =>{
    try {
        let data = await db.User.findAll();//truy vấn tất cả dữ liệu trong bảng Users
        return res.render("homepage.ejs",{
            data: JSON.stringify(data) //chuyển dữ liệu từ dạng object sang dạng string
        });
        return res.render("homepage.ejs");
    } catch (error) {
        console.log(error);
    }
}
let getAboutPage = (req,res) =>{
    return res.render("test/about.ejs");
}
let getSignInPage = (req,res) =>{
    return res.render("signin.ejs");
}
let postCRUD = async(req,res) =>{
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("post crud from server");
}
let getSignUpPage = (req,res) =>{
    return res.render("signup.ejs");
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getSignInPage: getSignInPage,
    postCRUD: postCRUD,
    getSignUpPage: getSignUpPage
}
