import React, { FC } from "react"
import { IFeedbackProps } from "../interfaces"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"
import { makeStyles, Theme } from "@material-ui/core/styles"

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
}))

const Feedback: FC<IFeedbackProps> = ({
	message,
	open,
	setMessage,
	setOpen,
}) => {
	const classes = useStyles()
	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === "clickaway") {
			return
		}
		setOpen(false)
		setMessage(null)
	}

	return (
		<div
			className={classes.root}
			data-testid={
				message === "Data has been appended to the list of points."
					? "feedback-success"
					: "feedback-error"
			}>
			<Snackbar
				open={open}
				autoHideDuration={4000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}>
				<Alert
					onClose={handleClose}
					severity={
						message === "Data has been appended to the list of points."
							? "success"
							: "error"
					}>
					{message}
				</Alert>
			</Snackbar>
		</div>
	)
}
export default Feedback
