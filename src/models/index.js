'use strict';
require('dotenv').config(); // Đảm bảo bạn đã load các biến môi trường từ file .env
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env]; // Cấu hình database
const db = {};

let sequelize;

// Kiểm tra nếu sử dụng môi trường để kết nối với database
if (config.use_env_variable) {
  // Sử dụng thông tin từ biến môi trường
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Sử dụng thông tin từ config.json
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: config.logging || false, // Có thể bật/tắt logging
  });
}

// Đọc tất cả các file model từ thư mục hiện tại (trừ file index.js này)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'; // Lọc các file JS
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Thiết lập các quan hệ giữa các bảng (nếu có)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Đảm bảo việc kết nối với database hoạt động tốt và bắt lỗi
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Thêm sequelize và Sequelize vào đối tượng db để có thể truy cập dễ dàng từ bất kỳ nơi nào
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
