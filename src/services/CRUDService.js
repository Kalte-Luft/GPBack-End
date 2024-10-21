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

module.exports = {
    createNewUser: createNewUser
};
