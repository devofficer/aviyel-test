import { useState } from "react";
import moment from "moment";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import MuiTableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import PrintIcon from "@material-ui/icons/PrintOutlined";

import { CustomerDialog, ProductDialog } from "./dialogs";

import {
	toTwoDecimal,
	getSubPrice,
	getTotalPrice,
	getGrantTotalPrice,
	numberWithCommas,
} from "./helpers";

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		backgroundColor: "#f2f3f5",
		padding: 30,
	},
	fabButton: {
		position: "absolute",
		zIndex: 1,
		top: 60,
		right: 30,
		margin: "0 auto",
		backgroundColor: "#ff64a4",
	},
	content: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	label: {
		fontSize: 14,
		textTransform: "upperCase",
		color: "#b4bbc5",
		marginBottom: 20,
	},
	detail: {
		flexGrow: 1,
		padding: "30px 40px",
	},
	summary: {
		display: "flex",
		marginBottom: 20,
	},
	invoice: {
		flexGrow: 1,
	},
	invoice1: {
		textTransform: "upperCase",
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 10,
	},
	invoice2: {
		fontSize: 14,
		color: "#4e545c",
		marginBottom: 5,
	},
	invoice3: {
		fontSize: 12,
		color: "#b4b7bc",
	},
	customer: {
		textAlign: "right",
		marginRight: 30,
	},
	customer1: {
		textTransform: "upperCase",
		color: "#95999e",
		fontSize: 14,
		marginBottom: 10,
	},
	customer2: {
		textTransform: "upperCase",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	customer3: {
		fontSize: 14,
		color: "#737982",
	},
	printButton: {
		width: 120,
		height: 50,
		marginTop: 10,
		color: "#67a8ff",
		borderColor: "#67a8ff",
		fontWeight: "bold",
	},
	total: {
		width: "30%",
		float: "right",
		marginRight: 16,
	},
	totalBox: {
		display: "flex",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	totalType: {
		color: "#383f48",
		fontSize: 14,
	},
	totalValue: {
		color: "#383f48",
		fontSize: 14,
		fontWeight: "bold",
	},
	grantType: {
		color: "#383f48",
		fontSize: 16,
		fontWeight: "bold",
	},
	grantValue: {
		color: "#383f48",
		fontSize: 16,
		fontWeight: "bold",
	},
});

const TableContainer = withStyles({
	root: {
		"& .MuiTableRow-head": {
			borderTop: "2px solid #e5e7ec",
			borderBottom: "2px solid #e5e7ec",
		},
		"& .MuiTableCell-head": {
			textTransform: "upperCase",
			color: "#b4bbc5",
			fontSize: 12,
		},
		marginBottom: 20,
	},
})(MuiTableContainer);

const DIALOG_STATE = {
	none: "none",
	customer: "customer",
	product: "product",
};

const Content = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(DIALOG_STATE.none);
	const [newInvoice, setNewInvoice] = useState({
		full_name: "",
		phone_number: "",
		address: "",
		email: "",
		pincode: "",
		items: [],
		tax: 0,
		discount: 0,
	});
	const { invoice, handleSave } = props;

	const handleAdd = (e) => {
		e.preventDefault();

		setOpen(DIALOG_STATE.customer);
	};

	const handlePrint = (e) => {
		e.preventDefault();

		window.print();
	};

	const handleInvoiceSave = (e) => {
		e.preventDefault();

		setOpen(DIALOG_STATE.none);
		handleSave(newInvoice);
	};

	const handleClose = () => {
		setOpen(DIALOG_STATE.none);
	};

	const handleChange = (e, type) => {
		let value = e.target.value;

		if (type === "tax" || type === "discount") {
			if (!value) {
				value = 0;
			} else {
				value = parseFloat(value);
			}
		}

		setNewInvoice({
			...newInvoice,
			[type]: value,
		});
	};

	const handleSkip = (e) => {
		e.preventDefault();

		setOpen(DIALOG_STATE.product);
	};

	const handleProceed = (e) => {
		e.preventDefault();

		setOpen(DIALOG_STATE.product);
	};

	const handleItemAdd = (item) => {
		setNewInvoice({
			...newInvoice,
			items: newInvoice.items.concat(item),
		});
	};

	const handleEdit = (e) => {
		e.preventDefault();

		setOpen(DIALOG_STATE.customer);
	};

	return (
		<Box className={classes.root}>
			<Fab color="secondary" className={classes.fabButton} onClick={handleAdd}>
				<AddIcon />
			</Fab>

			{invoice && (
				<Box className={classes.content}>
					<Typography className={classes.label}>Invoice Details</Typography>
					<Paper className={classes.detail} id="section-to-print">
						<Box className={classes.summary}>
							<Box className={classes.invoice}>
								<Typography className={classes.invoice1}>Invoice</Typography>
								<Typography className={classes.invoice2}>
									# INV{invoice.id}
								</Typography>
								<Typography className={classes.invoice3}>
									{moment(invoice.createdAt).calendar()}
								</Typography>
							</Box>
							<Box className={classes.customer}>
								<Typography className={classes.customer1}>
									Customer Details
								</Typography>
								<Typography className={classes.customer2}>
									{invoice.full_name}
								</Typography>
								<Typography className={classes.customer3}>
									{invoice.email}
								</Typography>
							</Box>
							<Button
								id="no-print"
								className={classes.printButton}
								variant="outlined"
								endIcon={<PrintIcon />}
								onClick={handlePrint}
							>
								Print
							</Button>
						</Box>

						<TableContainer>
							<Table>
								<TableHead>
									<TableRow className={classes.tableHead}>
										<TableCell>ITEM</TableCell>
										<TableCell align="center">QUANTITY</TableCell>
										<TableCell align="right">PRICE - ₹</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{invoice.items.map((item, index) => (
										<TableRow key={index}>
											<TableCell>{item.name}</TableCell>
											<TableCell align="center">{item.quantity}</TableCell>
											<TableCell align="right" style={{ fontWeight: "bold" }}>
												{numberWithCommas(toTwoDecimal(item.price))}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>

						<Box className={classes.total}>
							<Box className={classes.totalBox}>
								<Typography className={classes.totalType}>Sub Total</Typography>
								<Typography className={classes.totalValue}>
									₹{" "}
									{numberWithCommas(toTwoDecimal(getTotalPrice(invoice.items)))}
								</Typography>
							</Box>
							<Box className={classes.totalBox}>
								<Typography className={classes.totalType}>
									Tax ({toTwoDecimal(invoice.tax)}%)
								</Typography>
								<Typography className={classes.totalValue}>
									₹{" "}
									{numberWithCommas(
										toTwoDecimal(
											getSubPrice(getTotalPrice(invoice.items), invoice.tax)
										)
									)}
								</Typography>
							</Box>
							<Box className={classes.totalBox}>
								<Typography className={classes.totalType}>
									Discount ({toTwoDecimal(invoice.discount)}%)
								</Typography>
								<Typography className={classes.totalValue}>
									₹ -
									{numberWithCommas(
										toTwoDecimal(
											getSubPrice(
												getTotalPrice(invoice.items),
												invoice.discount
											)
										)
									)}
								</Typography>
							</Box>
							<Box className={classes.totalBox}>
								<Typography className={classes.grantType}>
									Grand Total
								</Typography>
								<Typography className={classes.grantValue}>
									₹{" "}
									{numberWithCommas(
										toTwoDecimal(
											getGrantTotalPrice(
												invoice.items,
												invoice.tax,
												invoice.discount
											)
										)
									)}
								</Typography>
							</Box>
						</Box>
					</Paper>
				</Box>
			)}

			<CustomerDialog
				open={open === DIALOG_STATE.customer}
				handleClose={handleClose}
				handleChange={handleChange}
				invoice={newInvoice}
				handleSkip={handleSkip}
				handleProceed={handleProceed}
			/>

			<ProductDialog
				open={open === DIALOG_STATE.product}
				handleClose={handleClose}
				invoice={newInvoice}
				handleChange={handleChange}
				handleEdit={handleEdit}
				handleSave={handleInvoiceSave}
				handleItemAdd={handleItemAdd}
			/>
		</Box>
	);
};

export default Content;
