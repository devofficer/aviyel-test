const db = require("../models");
const Invoice = db.invoices;

exports.create = (req, res) => {
	const {
		full_name,
		phone_number,
		address,
		email,
		pincode,
		items,
		tax,
		discount,
	} = req.body;

	const invoice = {
		full_name,
		phone_number,
		address,
		email,
		pincode,
		items,
		tax,
		discount,
	};

	Invoice.create(invoice)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Tutorial.",
			});
		});
};

exports.findAll = (req, res) => {
	Invoice.findAll({
		order: [["createdAt", "DESC"]],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving tutorials.",
			});
		});
};
