import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	root: {
		display: "flex",
		alignItems: "center",
		padding: 32,
		height: 72,
		backgroundColor: "#336399",
		color: "white",
		fontSize: 18,
	},
});

const Header = (props) => {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<Typography>Dashboard</Typography>
		</Box>
	);
};

export default Header;
