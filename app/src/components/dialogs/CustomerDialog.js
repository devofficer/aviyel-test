import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SkipNextIcon from "@material-ui/icons/SkipNextOutlined";

import { Input, Dialog } from "./components";

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
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: 5,
		borderBottom: "2px solid #e5e7ec",
		marginBottom: 20,
	},
	head: {
		textTransform: "upperCase",
		fontSize: 14,
		color: "#51575f",
		fontWeight: "bold",
	},
	skipButton: {
		backgroundColor: "#f3f4f6",
		color: "#67a8ff",
		boxShadow: "unset",
	},
	form: {
		display: "flex",
		marginBottom: 50,
	},
	pane: {
		display: "flex",
		flexDirection: "column",
		"&:not(:last-child)": {
			marginRight: 20,
		},
		width: "50%",
	},
	group: {
		display: "flex",
		flexDirection: "column",
		"&:not(:last-child)": {
			marginBottom: 20,
		},
		color: "#6d7078",
	},
	address: {
		flexGrow: 1,
		"& .MuiInputBase-inputMultiline": {
			height: "100% !important",
		},
	},
	areacode: {
		backgroundColor: "#f2f3f5",
		color: "#878c93",
		minWidth: 70,
		height: 40,
		marginTop: -20,
		marginLeft: -10,
		marginBottom: -20,
		marginRight: 10,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	pincode: {
		width: "30%",
	},
	dialogActions: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		backgroundColor: "#eef0f2",
		height: 90,
		padding: 30,
	},
	proceedButton: {
		width: 170,
		height: 40,
		backgroundColor: "#66a7ff",
	},
	flexGrow: {
		flexGrow: 1,
	},
});

const CustomerDialog = (props) => {
	const classes = useStyles();
	const {
		open,
		handleClose,
		handleChange,
		invoice,
		handleProceed,
		handleSkip,
	} = props;

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
					<Typography className={classes.head}>Customer Details</Typography>
					<Button
						className={classes.skipButton}
						variant="contained"
						endIcon={<SkipNextIcon />}
						onClick={handleSkip}
					>
						Skip
					</Button>
				</Box>

				<form className={classes.form}>
					<Box className={classes.pane}>
						<Box className={classes.group}>
							<Typography>Full Name *</Typography>
							<Input
								value={invoice.full_name}
								onChange={(e) => handleChange(e, "full_name")}
								placeholder="Customer Name"
							/>
						</Box>
						<Box className={clsx(classes.group, classes.flexGrow)}>
							<Typography>Address</Typography>
							<Input
								className={classes.address}
								value={invoice.address}
								onChange={(e) => handleChange(e, "address")}
								placeholder="Complete Address"
								multiline
							/>
						</Box>
					</Box>

					<Box className={classes.pane}>
						<Box className={classes.group}>
							<Typography>Phone Number *</Typography>
							<Input
								value={invoice.phone_number}
								onChange={(e) => handleChange(e, "phone_number")}
								startAdornment={
									<Typography className={classes.areacode}>+91</Typography>
								}
							/>
						</Box>
						<Box className={classes.group}>
							<Typography>Email ID *</Typography>
							<Input
								value={invoice.email}
								onChange={(e) => handleChange(e, "email")}
								placeholder="Customer Email Address"
							/>
						</Box>
						<Box className={classes.group}>
							<Typography>Pincode</Typography>
							<Input
								value={invoice.pincode}
								onChange={(e) => handleChange(e, "pincode")}
								className={classes.pincode}
								placeholder="560067"
							/>
						</Box>
					</Box>
				</form>
			</Box>

			<Box className={classes.dialogActions}>
				<Button
					className={classes.proceedButton}
					variant="contained"
					color="primary"
					onClick={handleProceed}
				>
					Proceed
				</Button>
			</Box>
		</Dialog>
	);
};

export default CustomerDialog;
