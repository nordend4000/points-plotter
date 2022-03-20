import React, { FC } from "react"
import { ICoordinatesProps } from "../interfaces"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import DeleteIcon from "@material-ui/icons/Delete"
import TimelineIcon from "@material-ui/icons/Timeline"

const Coordinates: FC<ICoordinatesProps> = ({
	coordinates,
	remove,
	update,
}) => {
	return (
		<Grid container justifyContent='center'>
			{coordinates.map((element: number[], index: number) => (
				<Box key={index}>
					<Box my={0.7} display='flex' justifyContent='flex-start'>
						<TimelineIcon color='primary' />
						<Box display='inline' ml={1.4}>
							<Typography variant='body1' gutterBottom color='primary'>
								POINT {index + 1}
							</Typography>
						</Box>
					</Box>
					<Box
						display='flex'
						flexWrap='wrap'
						justifyContent='space-evenly'
						alignItems='center'>
						<Box m={0.5}>
							<TextField
								id='filled-basic'
								label='X'
								variant='filled'
								type='number'
								inputProps={{ step: "0.01" }}
								value={element[0]}
								onChange={e => update(parseFloat(e.target.value), index, 1)}
							/>
						</Box>
						<Box m={0.5}>
							<TextField
								id='filled-basic'
								label='Y'
								variant='filled'
								type='number'
								inputProps={{ step: "0.01" }}
								value={element[1]}
								onChange={e => update(parseFloat(e.target.value), index, 0)}
							/>
						</Box>
						<Box m={2}>
							<Button
								variant='outlined'
								color='secondary'
								startIcon={<DeleteIcon />}
								onClick={() => remove(index)}>
								Remove
							</Button>
						</Box>
					</Box>
				</Box>
			))}
		</Grid>
	)
}

export default Coordinates
