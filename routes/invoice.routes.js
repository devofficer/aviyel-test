module.exports = (app) => {
  const invoices = require("../controllers/invoice.controller.js");

  var router = require("express").Router();

  router.post("/", invoices.create);

  router.get("/", invoices.findAll);

  app.use("/api/invoices", router);
};
