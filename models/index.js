const Sequelize = require("sequelize");

const DB = process.env.DB || "aviyel";
const USER = process.env.DB_USER || "root";
const PASSWORD = process.env.DB_PASSWORD || "root";
const HOST = process.env.DB_HOST || "localhost";
const PORT = process.env.DB_PORT || 3306;
const DIALECT = process.env.DB_DIALECT || "mariadb";

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
