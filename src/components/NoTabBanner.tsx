import React, { FC } from "react"
import { INoTabBannerProps } from "../interfaces"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import AddIcon from "@material-ui/icons/Add"

const NoTabBanner: FC<INoTabBannerProps> = ({ openNewTab }) => {
	return (
		<Typography component='div'>
			<Box textAlign='center' fontSize='h6.fontSize' my={4}>
				To start adding point, please open a new Tab
				<Box display='inline' ml={2}>
					<Button
						color='primary'
						size='large'
						variant='outlined'
						onClick={openNewTab}
						startIcon={<AddIcon />}>
						{" "}
						New Tab
					</Button>
				</Box>
			</Box>
		</Typography>
	)
}

export default NoTabBanner
