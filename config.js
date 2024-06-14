require('dotenv').config();
const config = {
  db: {
    host: process.env.MYSQL_BD_HOST,
    user: process.env.MYSQL_BD_USER,
    username: process.env.MYSQL_BD_USER,
    password: process.env.MYSQL_BD_PWD,
    database: process.env.MYSQL_BD_NAME,
    connectTimeout: 60000,
  },
  listPerPage: 10,
};
module.exports = config;
