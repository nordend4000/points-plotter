import React, { FC } from "react"
import { IPlotterHeaderProps } from "../interfaces"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"
import TextField from "@material-ui/core/TextField"
import SaveIcon from "@material-ui/icons/Save"
import IconButton from "@material-ui/core/IconButton"
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation"
import CloudDownloadIcon from "@material-ui/icons/CloudDownload"

const PlotterHeader: FC<IPlotterHeaderProps> = ({
	donwloadData,
	closeTab,
	el,
	id,
	renameTab,
	setRenameTab,
	renameActiveTab,
}) => {
	return (
		<>
			<Box mt={1} mb={1} display='flex' justifyContent='flex-end'>
				<Button
					color='primary'
					onClick={() => closeTab(id)}
					size='medium'
					variant='outlined'
					endIcon={<CancelPresentationIcon />}>
					Close {el}
				</Button>
			</Box>
			<Box
				mb={1}
				ml={1}
				display='flex'
				justifyContent='flex-start'
				alignItems='center'>
				<Box mr={5}>
					<Button
						color='primary'
						onClick={() => donwloadData(id)}
						size='medium'
						variant='outlined'
						startIcon={<CloudDownloadIcon />}>
						Donwload
					</Button>
				</Box>
				<TextField
					id='filled-basic'
					label='Rename'
					variant='outlined'
					type='text'
					size='small'
					value={renameTab}
					onChange={e => setRenameTab(e.target.value.toUpperCase())}
				/>
				<Tooltip title='Save' arrow placement='right'>
					<IconButton aria-label='save' onClick={() => renameActiveTab()}>
						<SaveIcon color='primary' fontSize='large' />
					</IconButton>
				</Tooltip>
			</Box>
		</>
	)
}

export default PlotterHeader
