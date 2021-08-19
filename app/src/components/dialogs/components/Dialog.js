import { withStyles } from "@material-ui/core/styles";
import MuiDialog from "@material-ui/core/Dialog";

const Dialog = withStyles({
	paper: {
		width: 800,
	},
})(MuiDialog);

export default Dialog;
