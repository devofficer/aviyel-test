require("dotenv").config();
const express = require("express");
const path = require("path");
const { Sequelize } = require("sequelize");

const app = express();

const db = require("./models");
db.sequelize.sync({ forced: true });

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("./app/build/"));

require("./routes/invoice.routes")(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`App is running at port ${PORT}.`));
