import React, { FC } from "react"
import { IChartProps } from "../interfaces"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import {
	LabelList,
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts"

const CustomTooltip = ({ active, payload }: any) => {
	if (active && payload && payload.length) {
		return (
			<Box className='custom-tooltip'>
				<Typography
					variant='body1'
					className='custom-tooltip__title'>{`Point ${payload[0].payload.point}`}</Typography>
				<Typography
					variant='body2'
					className='custom-tooltip__label'>{`${payload[0].name} : ${payload[0].value}`}</Typography>
				<Typography
					variant='body2'
					className='custom-tooltip__label'>{`${payload[1].name} : ${payload[1].value}`}</Typography>
			</Box>
		)
	}

	return null
}

const Chart: FC<IChartProps> = ({ dataChart, tab }) => {
	// IF MAX AXIS < 1 THEN DEFAULT MAX AXIS TO 1
	const computeMax = (dataMax: number) => {
		let max = 1
		if (dataMax > 1) max = dataMax
		return max
	}

	return (
		<ResponsiveContainer
			width='100%'
			height='100%'
			minWidth='100px'
			minHeight='100px'>
			<ScatterChart
				style={{
					cursor: "crosshair",
				}}>
				<CartesianGrid />
				<XAxis
					type='number'
					dataKey='x'
					name='X'
					domain={[0, (dataMax: number) => computeMax(dataMax)]}
				/>
				<YAxis
					type='number'
					dataKey='y'
					name='Y'
					domain={[0, (dataMax: number) => computeMax(dataMax)]}
				/>
				<Tooltip
					cursor={{ stroke: "#4154B3", strokeWidth: 0.4 }}
					content={<CustomTooltip />}
				/>
				<Legend iconType='line' />
				<Scatter name={tab} data={dataChart} fill='#4154B3 ' line shape='cross'>
					{dataChart.length > 1 && (
						<LabelList dataKey='point' position='bottom' fill='#c61919' />
					)}
				</Scatter>
			</ScatterChart>
		</ResponsiveContainer>
	)
}

export default Chart
