const Sequelize = require("sequelize");

const DB = process.env.DB || "aviyel";
const USER = process.env.USER || "root";
const PASSWORD = process.env.PASSWORD || "root";
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3306;
const DIALECT = process.env.DIALECT || "mariadb";

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: DIALECT,
});

const db = {
  Sequelize,
  sequelize,
  invoices: require("./invoice.model.js")(sequelize, Sequelize),
};

module.exports = db;
