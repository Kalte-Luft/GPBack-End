const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('ywgqp97rs3et_GreenPaws', 'ywgqp97rs3et_admin',"sadboylamdoan", {
    host: 'kevin.id.vn',
    dialect: 'mysql',
    "logging": false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = connectDB;