import db from "../models/index";

let getAllProvinces = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Provinces = "";
            if (id === "ALL") { //nếu id = "ALL" thì lấy tất cả các Province
                Provinces = await db.Province.findAll();
            } else if (id) { //nếu id có giá trị thì lấy Province theo id
                Provinces = await db.Province.findOne({
                    where: { id },
                });
            }
            resolve(Provinces);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllProvinces,
};
