import { useState } from "react";
import moment from "moment";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import SearchIcon from "@material-ui/icons/Search";

import {
	getTwoDigits,
	getGrantTotalPrice,
	getFilteredInvoices,
	toTwoDecimal,
	numberWithCommas,
} from "./helpers";

const useStyles = makeStyles({
	root: {
		width: 350,
		backgroundColor: "#2f3740",
	},
	searchBox: {
		display: "flex",
		alignItems: "center",
		margin: "16px 10px",
		padding: "12px 16px",
		borderRadius: 9999,
		backgroundColor: "#353e48",
	},
	searchIcon: {
		color: "#8893a0",
	},
	searchInput: {
		flexGrow: 1,
		color: "#738090",
		marginLeft: 10,
	},
	label: {
		color: "#606a76",
		textTransform: "uppercase",
		fontWeight: "bold",
		padding: "10px 30px",
	},
	list: {},
	listItem: {
		display: "flex",
		alignItems: "center",
		height: 110,
		padding: "20px 30px",
		"&:first-child": {
			borderTop: "1px solid #3d4550",
		},
		borderBottom: "1px solid #3d4550",
		"&:hover": {
			backgroundColor: "#505b67",
		},
	},
	selectedItem: {
		backgroundColor: "#404b57",
	},
	leftPane: {
		flexGrow: 1,
	},
	rightPane: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		marginRight: 0,
		textAlign: "right",
		height: "100%",
	},
	invoiceId: {
		marginBottom: 5,
		textTransform: "uppercase",
		color: "white",
		fontSize: 17,
	},
	invoiceItems: {
		color: "white",
		fontSize: 14,
	},
	invoiceFullName: {
		textTransform: "capitalize",
		color: "#5e95dd",
		fontSize: 14,
	},
	invoiceDate: {
		marginTop: 4,
		color: "#737e8b",
		fontSize: 13,
	},
	invoicePrice: {
		color: "white",
		fontSize: 17,
	},
});

const Sidebar = (props) => {
	const { invoices, handleSelectInvoice, selectedId } = props;
	const classes = useStyles();
	const [searchValue, setSearchValue] = useState("");

	const handleChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handleClick = (e, id) => {
		e.preventDefault();

		handleSelectInvoice(id);
	};

	return (
		<Box className={classes.root}>
			<Box className={classes.searchBox}>
				<SearchIcon className={classes.searchIcon} />
				<InputBase
					className={classes.searchInput}
					value={searchValue}
					onChange={handleChange}
					placeholder="Search..."
				/>
			</Box>
			<Box className={classes.invoices}>
				<Typography className={classes.label}>
					Invoices - {invoices.length}
				</Typography>
				<List>
					{getFilteredInvoices(invoices, searchValue).map((invoice) => (
						<ListItem
							key={invoice.id}
							className={clsx(
								classes.listItem,
								selectedId === invoice.id ? classes.selectedItem : ""
							)}
							onClick={(e) => handleClick(e, invoice.id)}
						>
							<Box className={classes.leftPane}>
								<Typography className={classes.invoiceId}>
									INV. # - {invoice.id}
								</Typography>
								<Typography className={classes.invoiceItems}>
									Items - {getTwoDigits(invoice.items.length)}
								</Typography>
								<Typography className={classes.invoiceFullName}>
									{invoice.full_name}
								</Typography>
							</Box>
							<Box className={classes.rightPane}>
								<Typography className={classes.invoiceDate}>
									{moment(invoice.createdAt).calendar()}
								</Typography>
								<Typography className={classes.invoicePrice}>
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
						</ListItem>
					))}
				</List>
			</Box>
		</Box>
	);
};

export default Sidebar;
