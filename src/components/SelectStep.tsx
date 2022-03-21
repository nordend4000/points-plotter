import React, { FC, useState } from "react"
import { ISelectStepProps } from "../interfaces"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import Box from "@material-ui/core/Box"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import ImportExportIcon from "@material-ui/icons/ImportExport"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: "flex",
			flexWrap: "wrap",
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
	}),
)

const SelectStep: FC<ISelectStepProps> = ({ step, setStep }) => {
	const classes = useStyles()
	const [open, setOpen] = useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div>
			<Box mb={1}>
				<Tooltip title='Step increment' arrow placement='right'>
					<IconButton aria-label='step' onClick={handleClickOpen} size='small'>
						<ImportExportIcon />
					</IconButton>
				</Tooltip>
			</Box>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Choose your input step increment</DialogTitle>
				<DialogContent>
					<form className={classes.container}>
						<FormControl className={classes.formControl}>
							<InputLabel id='demo-dialog-select-label'>Step</InputLabel>
							<Select
								labelId='demo-dialog-select-label'
								id='demo-dialog-select'
								value={step}
								onChange={e => setStep(Number(e.target.value))}
								input={<Input />}>
								<MenuItem value={0.01}>0.01 (default)</MenuItem>
								<MenuItem value={0.05}>0.05</MenuItem>
								<MenuItem value={0.1}>0.10</MenuItem>
								<MenuItem value={0.25}>0.25</MenuItem>
								<MenuItem value={0.5}>0.50</MenuItem>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={10}>10</MenuItem>
								<MenuItem value={100}>100</MenuItem>
								<MenuItem value={1000}>1000</MenuItem>
							</Select>
						</FormControl>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>
					<Button onClick={handleClose} color='primary'>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
export default SelectStep
