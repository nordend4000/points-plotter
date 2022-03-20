import React, { Dispatch } from "react"

export interface IFeedbackProps {
	message: string | null
	open: boolean
	setMessage: Dispatch<React.SetStateAction<string | null>>
	setOpen: Dispatch<React.SetStateAction<boolean>>
}

export interface ILayoutProps {
	store: number[][][]
	setStore: Dispatch<React.SetStateAction<number[][][]>>
	activeTab: number
	setActiveTab: Dispatch<React.SetStateAction<number>>
	tab: string[]
	setTab: Dispatch<React.SetStateAction<string[]>>
}

export interface ITabPanelProps {
	children?: React.ReactNode
	index: any
	activeTab: any
}

export interface IPlotterProps {
	tab: string
	activeTab: number
	store: number[][][]
	setStore: Dispatch<React.SetStateAction<number[][][]>>
}
export interface IDataChart {
	[key: string]: number | string
}

export interface ICoordinatesProps {
	coordinates: number[][]
	remove: (index: number) => void
	update: (value: number, index: number, indexXY: number) => void
}

export interface IChartProps {
	dataChart: IDataChart[]
	tab: string
}

export interface IAxisLimit {
	maxX: number
	maxY: number
}
// SHAPE OF DATA FOR STORE
//
// const STORE_START = [
// 	[
// 		[1, 2],
// 		[2, 3],
// 		[4, 8],
// 		[6, 6],
// 	],
// 	[[1, 1]],
// 	[[1, 1]],
// 	[[1, 1]],
// ]

// SHAPE OF DATA FOR COORDINATE COMPONENT
//
// const DATA_COORDINATES = [
// 	[1, 2],
// 	[2, 3],
// 	[4, 6],
// ]

// SHAPE OF DATA FOR CHART COMPONENT
//
// const DATA_CHART = [
// 	{
// 		point: "1",
// 		x: 1,
// 		y: 2,
// 	},
// 	{
// 		point: "2",
// 		x: 2,
// 		y: 3,
// 	},
// 	{
// 		point: "3",
// 		x: 4,
// 		y: 6,
// 	},
// ]
