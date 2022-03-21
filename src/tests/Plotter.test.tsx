import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Plotter from "../components/Plotter"
import { IPlotterProps } from "../interfaces"

function renderPlotter(props: Partial<IPlotterProps> = {}) {
	const defaultProps: IPlotterProps = {
		tab: "Tab 1",
		activeTab: 1,
		store: [
			[
				[1, 1],
				[10, 20],
				[30, 40],
			],
			[[0, 0]],
			[[0, 0]],
		],
		setStore() {
			return
		},
	}
	return render(<Plotter {...defaultProps} {...props} />)
}

describe("<Plotter/>", () => {
	test("should display a add button and on double click it call the setStore() twice", async () => {
		const setStore = jest.fn()
		renderPlotter({ setStore })
		const buttonAddPoint = screen.getByRole("button", { name: "Add Point" })
		expect(buttonAddPoint).toBeInTheDocument()
		fireEvent.click(buttonAddPoint)
		fireEvent.click(buttonAddPoint)
		expect(setStore).toHaveBeenCalledTimes(2)
	})
})
