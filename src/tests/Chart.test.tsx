import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Chart from "../components/Chart"
import { IChartProps } from "../interfaces"

function renderChart(props: Partial<IChartProps> = {}) {
	const defaultProps: IChartProps = {
		dataChart: [
			{
				point: "1",
				x: 1,
				y: 2,
			},
			{
				point: "2",
				x: 2,
				y: 3,
			},
			{
				point: "3",
				x: 4,
				y: 6,
			},
		],
		tab: "Tab 2",
	}
	return render(<Chart {...defaultProps} {...props} />)
}

describe("<Chart/>", () => {
	test("should display the Container ...", () => {
		const view = renderChart()
		expect(view.container).toBeInTheDocument()
	})
})
