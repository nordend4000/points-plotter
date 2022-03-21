import React, { FC, useState, useRef, useLayoutEffect, useEffect } from "react"
import { IPlotterProps, IDataChart, IAxisLimit } from "../interfaces"
import { updateStore } from "../utils/utils"
import Coordinates from "./Coordinates"
import Chart from "./Chart"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import Divider from "@material-ui/core/Divider"
import AddIcon from "@material-ui/icons/Add"

const Plotter: FC<IPlotterProps> = ({ tab, store, setStore, activeTab }) => {
	const [dataChart, setDataChart] = useState<IDataChart[] | null>(null)
	const [clickPosition, setClickPosition] = useState<number[] | null>(null)
	const [axisLimit, setAxisLimit] = useState<IAxisLimit | null>(null)
	const chartRef = useRef<HTMLDivElement>(null)

	// CRUD FUNCTIONS FOR COORDINATES : UPDATE inputs + REMOVE & ADD buttons
	const removePoint = (index: number) => {
		const removePointFromTabArray = store[activeTab].filter(
			(item, idx) => idx !== index,
		)
		setStore(updateStore(store, removePointFromTabArray, activeTab))
	}
	const addPoint = () => {
		const addPointToTabArray = [...store[activeTab], [0, 0]]
		setStore(updateStore(store, addPointToTabArray, activeTab))
	}
	const updatePoint = (value: number, index: number, indexXY: number) => {
		let newCoordinate = 0
		const newArray: number[][] = []
		store[activeTab].forEach((el, idx) => {
			if (idx !== index) newArray.push(el)
			if (idx === index) {
				if (value > 0) newCoordinate = value
				// UPDATE X COORDINATE AND KEEP EXISTING Y
				if (indexXY === 1) {
					newArray.push([newCoordinate, store[activeTab][index][indexXY]])
				}
				// UPDATE Y COORDINATE AND KEEP EXISTING X
				if (indexXY === 0) {
					newArray.push([store[activeTab][index][indexXY], newCoordinate])
				}
			}
		})
		setStore(updateStore(store, newArray, activeTab))
	}

	// FUNCTIONS FOR CHART : Convert array & get Axis limits
	const convertData4Chart = (arrayXY: number[][]) => {
		const newChartArray: IDataChart[] = []
		arrayXY.forEach((el, id) => {
			const point = {
				point: (id + 1).toString(),
				x: el[0],
				y: el[1],
			}
			newChartArray.push(point)
		})
		setDataChart(newChartArray)
	}
	const getChartAxisLimit = (arrayXY: number[][]) => {
		// IF MAX < 1 THEN DEFAULT MAX AXIS TO 1
		let maxX = 1
		let maxY = 1
		arrayXY.forEach(el => {
			if (el[0] > maxX) maxX = el[0]
			if (el[1] > maxY) maxY = el[1]
		})
		setAxisLimit({
			maxX,
			maxY,
		})
	}
	useEffect(() => {
		convertData4Chart(store[activeTab])
		getChartAxisLimit(store[activeTab])
	}, [store, activeTab])

	// CREATE POINT ON CHART CLICK
	const handleChartClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => {
		setClickPosition([event.clientX, event.clientY])
	}

	const createPointByClick = (
		originX: number,
		originY: number,
		maxX: number,
		maxY: number,
	) => {
		if (clickPosition == null || axisLimit == null) return
		// POSITION OF THE CLICKED POINT
		const clickX = clickPosition[0]
		const clickY = clickPosition[1]
		// LENGHT OF ORIGIN TO MAX
		const originX2MaxX = maxX - originX
		const originY2MaxY = originY - maxY
		// LENGHT OF ORIGIN TO THE CLICKED POINT
		let originX2ClickX = clickX - originX
		let originY2ClickY = originY - clickY
		// ALLOW USER TO CLICK OUTSIDE THE GRAPH 4px CLOSE TO THE ORIGIN LINE AND GET 0
		if (originX2ClickX < -4 || originY2ClickY < -4) return
		if (originX2ClickX > -4 && originX2ClickX < 0) originX2ClickX = 0
		if (originY2ClickY > -4 && originY2ClickY < 0) originY2ClickY = 0

		let newCoordinateX = 0
		let newCoordinateY = 0
		newCoordinateX = (originX2ClickX * axisLimit.maxX) / originX2MaxX
		newCoordinateY = (originY2ClickY * axisLimit.maxY) / originY2MaxY

		const newArray = [
			...store[activeTab],
			[
				parseFloat(newCoordinateX.toFixed(2)),
				parseFloat(newCoordinateY.toFixed(2)),
			],
		]
		setStore(updateStore(store, newArray, activeTab))
	}
	// Allow Ref.current to be available, compute graph limits
	// & call createPointByClick() with current bounding
	useLayoutEffect(() => {
		if (null == chartRef.current) return
		const originX = chartRef.current.getBoundingClientRect().left + 66
		const originY = chartRef.current.getBoundingClientRect().bottom - 52
		const maxX = chartRef.current.getBoundingClientRect().right - 5
		const maxY = chartRef.current.getBoundingClientRect().top - 5
		createPointByClick(originX, originY, maxX, maxY)
		// eslint-disable-next-line
	}, [clickPosition])

	return (
		<Container maxWidth='lg'>
			<Grid
				container
				direction='row'
				justifyContent='space-evenly'
				alignItems='center'>
				<Grid item xs={6}>
					<Coordinates
						coordinates={store[activeTab]}
						remove={removePoint}
						update={updatePoint}
					/>
					<Box my={3}>
						<Divider />
					</Box>
					<Box display='flex' justifyContent='center' mb={2}>
						<Button
							size='large'
							onClick={addPoint}
							variant='outlined'
							color='primary'
							startIcon={<AddIcon />}>
							Add Point
						</Button>
					</Box>
				</Grid>
				<Grid
					ref={chartRef}
					item
					xs={6}
					className='chart'
					onMouseDown={e => handleChartClick(e)}>
					{dataChart && <Chart dataChart={dataChart} tab={tab} />}
				</Grid>
			</Grid>
		</Container>
	)
}

export default Plotter
