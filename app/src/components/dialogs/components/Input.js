import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

const Input = withStyles({
	root: {
		border: "1px solid #d0d4dd",
		borderRadius: 2,
		padding: "5px 10px",
	},
})(InputBase);

export default Input;
