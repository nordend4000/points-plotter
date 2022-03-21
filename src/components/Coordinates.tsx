import React, { FC, useState } from "react"
import { ICoordinatesProps } from "../interfaces"
import SelectStep from "./SelectStep"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import Divider from "@material-ui/core/Divider"
import DeleteIcon from "@material-ui/icons/Delete"
import TimelineIcon from "@material-ui/icons/Timeline"

const Coordinates: FC<ICoordinatesProps> = ({
	coordinates,
	remove,
	update,
}) => {
	const [step, setStep] = useState<number>(0.01)

	return (
		<>
			<SelectStep step={step} setStep={setStep} />
			<Box my={1}>
				<Divider />
			</Box>
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
									size='small'
									label='X'
									variant='outlined'
									type='number'
									inputProps={{ step: `${step}` }}
									value={element[0]}
									onChange={e => update(parseFloat(e.target.value), index, 1)}
								/>
							</Box>
							<Box m={0.5}>
								<TextField
									id='filled-basic'
									size='small'
									label='Y'
									variant='outlined'
									type='number'
									inputProps={{ step: `${step}` }}
									value={element[1]}
									onChange={e => update(parseFloat(e.target.value), index, 0)}
								/>
							</Box>
							<Box m={1}>
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
		</>
	)
}

export default Coordinates
