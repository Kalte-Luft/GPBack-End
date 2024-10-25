import bcrypt from 'bcryptjs';
import db from '../models/index';

let createNewUser = async (data) => {
    try {
        const salt = await bcrypt.genSalt(10);
        let hashPasswordFromBcrypt = await bcrypt.hash(data.password, salt);
        await db.User.create({
            email: data.email,
            password: hashPasswordFromBcrypt,
            phone: data.phone,
        });
        return 'Create new user success';
    } catch (error) {
        console.error("Lỗi khi tạo người dùng:", error);
        throw error;
    }
};
let getAllUser = async () => {
    try {
        let users = await db.User.findAll();
        return users;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        throw error;
    }
}
let getUserInfoById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })
            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
        } catch (error) {
            reject(error);
        }
    });
}
let updateUserData = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            });
            if (user) {
                user.name = data.name;
                user.email = data.email;
                user.phone = data.phone;
                user.address = data.address;
                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve('Cannot find user to update');
            }
        } catch (error) {
            reject(error);
        }
    });
}
let deleteUserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            });
            if (user) {
                await user.destroy();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve('Cannot find user to delete');
            }
        } catch (error) {
            console.error("Lỗi khi xóa người dùng:", error);
        }
    });
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
};
