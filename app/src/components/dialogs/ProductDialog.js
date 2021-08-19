import { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import MuiTableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from "@material-ui/icons/Close";
import BorderColorIcon from "@material-ui/icons/BorderColorOutlined";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

import { Input, Dialog } from "./components";
import {
	numberWithCommas,
	toTwoDecimal,
	getTotalPrice,
	getGrantTotalPrice,
	getSubPrice,
} from "../helpers";

const useStyles = makeStyles({
	dialogTitle: {
		display: "flex",
		alignItems: "center",
	},
	title: {
		fontSize: 18,
		color: "#383f48",
		fontWeight: "bold",
		textTransform: "capitalize",
		marginRight: 40,
		padding: "30px 40px",
	},
	orderLabel: {
		textTransform: "upperCase",
		color: "#878c93",
		fontSize: 16,
		marginRight: "auto",
	},
	closeButton: {
		position: "absolute",
		top: 15,
		right: 15,
	},
	dialogContent: {
		paddingLeft: 40,
		paddingRight: 40,
	},
	dialogHead: {
		display: "flex",
		alignItems: "flex-end",
		justifyContent: "space-between",
		paddingBottom: 5,
	},
	head: {
		textTransform: "upperCase",
		fontSize: 14,
		color: "#51575f",
		fontWeight: "bold",
	},
	customer: {
		textAlign: "right",
		marginTop: -50,
		marginRight: 10,
		flexGrow: 1,
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
	editButton: {
		color: "#67a8ff",
	},
	addBox: {
		display: "flex",
		alignItems: "center",
		height: 70,
		padding: "10px 0",
	},
	nameInput: {
		marginRight: 20,
		minWidth: "50%",
	},
	quantityInput: {
		marginRight: 20,
	},
	priceInput: {
		marginRight: 20,
	},
	enterButton: {
		color: "#67a8ff",
		borderColor: "#67a8ff",
		width: 50,
		height: 40,
	},
	summary: {
		display: "flex",
		alignItems: "center",
		borderTop: "1px solid #f1f3f5",
		height: 75,
		paddingTop: 18,
		paddingBottom: 18,
	},
	taxInput: {
		width: 120,
		marginRight: 20,
	},
	discountInput: {
		width: 120,
	},
	subtotalLabel: {
		marginLeft: "auto",
		marginRight: 40,
		color: "#383f48",
		fontSize: 14,
	},
	subtotalValue: {
		marginRight: 20,
		color: "#383f48",
		fontSize: 14,
		fontWeight: "bold",
	},
	dialogActions: {
		display: "flex",
		alignItems: "center",
		backgroundColor: "#eef0f2",
		height: 90,
		padding: 30,
	},
	tax: {
		marginLeft: 30,
		marginRight: 30,
	},
	discount: {
		marginRight: 30,
	},
	grand: {
		marginLeft: "auto",
		marginRight: 50,
	},
	type: {
		color: "#757d8e",
		fontSize: 12,
		fontWeight: "bold",
		marginBottom: 5,
	},
	value: {
		color: "#b4bbc5",
		fontSize: 14,
	},
	grandValue: {
		color: "#2f3740",
		fontSize: 14,
		fontWeight: "bold",
	},
	saveButton: {
		width: 170,
		height: 40,
		backgroundColor: "#66a7ff",
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
		height: 250,
	},
})(MuiTableContainer);

const ProductDialog = (props) => {
	const classes = useStyles();
	const {
		open,
		handleClose,
		invoice,
		handleChange,
		handleSave,
		handleItemAdd,
		handleEdit,
	} = props;
	const [item, setItem] = useState({
		name: "",
		quantity: 0,
		price: 0,
	});

	const handleItemChange = (e, type) => {
		let value = e.target.value;

		if (type === "quantity" || type === "price") {
			if (!value) {
				value = 0;
			} else {
				value = parseFloat(value);
			}
		}

		setItem({
			...item,
			[type]: value,
		});
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="xl">
			<Box className={classes.dialogTitle}>
				<Typography className={classes.title}>Create New Invoice</Typography>
				<Typography className={classes.orderLabel}>ORDER NO: 1234</Typography>
				<IconButton className={classes.closeButton} onClick={handleClose}>
					<CloseIcon />
				</IconButton>
			</Box>

			<Box className={classes.dialogContent}>
				<Box className={classes.dialogHead}>
					<Typography className={classes.head}>Product Details</Typography>
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
					<IconButton className={classes.editButton} onClick={handleEdit}>
						<BorderColorIcon />
					</IconButton>
				</Box>

				<TableContainer>
					<Table>
						<TableHead>
							<TableRow className={classes.tableHead}>
								<TableCell>ITEM</TableCell>
								<TableCell>QUANTITY</TableCell>
								<TableCell align="right">PRICE - ₹</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{invoice.items.map((item, index) => (
								<TableRow key={index}>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.quantity}</TableCell>
									<TableCell align="right" style={{ fontWeight: "bold" }}>
										{numberWithCommas(toTwoDecimal(item.price))}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>

					<Box className={classes.addBox}>
						<Input
							className={classes.nameInput}
							value={item.name}
							onChange={(e) => handleItemChange(e, "name")}
							placeholder="Please enter Item Name"
						/>
						<Input
							className={classes.quantityInput}
							type="number"
							value={item.quantity}
							onChange={(e) => handleItemChange(e, "quantity")}
							placeholder="0.00"
						/>
						<Input
							className={classes.priceInput}
							type="number"
							step="0.01"
							value={item.price}
							onChange={(e) => handleItemChange(e, "price")}
							placeholder="0.00"
						/>
						<Button
							className={classes.enterButton}
							variant="outlined"
							onClick={(e) => handleItemAdd(item)}
						>
							<KeyboardReturnIcon />
						</Button>
					</Box>
				</TableContainer>

				<Box className={classes.summary}>
					<Input
						className={classes.taxInput}
						type="number"
						step="0.01"
						value={invoice.tax}
						onChange={(e) => handleChange(e, "tax")}
						placeholder="Tax"
						endAdornment={<Typography>%</Typography>}
					/>
					<Input
						className={classes.discountInput}
						type="number"
						step="0.01"
						value={invoice.discount}
						onChange={(e) => handleChange(e, "discount")}
						placeholder="Discount"
						endAdornment={<Typography>%</Typography>}
					/>
					<Typography className={classes.subtotalLabel}>Sub Total</Typography>
					<Typography className={classes.subtotalValue}>
						₹ {numberWithCommas(toTwoDecimal(getTotalPrice(invoice.items)))}
					</Typography>
				</Box>
			</Box>

			<Box className={classes.dialogActions}>
				<Box className={classes.tax}>
					<Typography className={classes.type}>Tax</Typography>
					<Typography className={classes.value}>
						₹{" "}
						{numberWithCommas(
							toTwoDecimal(
								getSubPrice(getTotalPrice(invoice.items), invoice.tax)
							)
						)}
					</Typography>
				</Box>
				<Box className={classes.discount}>
					<Typography className={classes.type}>Discount</Typography>
					<Typography className={classes.value}>
						₹
						{numberWithCommas(
							toTwoDecimal(
								getSubPrice(getTotalPrice(invoice.items), invoice.discount)
							)
						)}
					</Typography>
				</Box>
				<Box className={classes.grand}>
					<Typography className={classes.type}>Grant Total</Typography>
					<Typography className={classes.grandValue}>
						₹{" "}
						{numberWithCommas(
							toTwoDecimal(
								getGrantTotalPrice(invoice.items, invoice.tax, invoice.discount)
							)
						)}
					</Typography>
				</Box>
				<Button
					className={classes.saveButton}
					variant="contained"
					color="primary"
					onClick={handleSave}
				>
					Save
				</Button>
			</Box>
		</Dialog>
	);
};

export default ProductDialog;
