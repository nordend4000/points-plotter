import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Coordinates from "../components/Coordinates"
import { ICoordinatesProps } from "../interfaces"

function renderCoordinates(props: Partial<ICoordinatesProps> = {}) {
	const defaultProps: ICoordinatesProps = {
		remove() {
			return
		},
		update() {
			return
		},
		coordinates: [
			[5, 6],
			[10, 11],
			[20, 21],
			[30, 31],
		],
	}
	return render(<Coordinates {...defaultProps} {...props} />)
}

describe("<Coordinates/>", () => {
	test("should display 4 remove Button, 8 inputs", () => {
		renderCoordinates()
		const removeButton = screen.getAllByRole("button")
		expect(removeButton).toHaveLength(4)
		const inputsNumber = screen.getAllByRole("spinbutton")
		expect(inputsNumber).toHaveLength(8)
	})
	test("should display the first input with value of 5", () => {
		renderCoordinates()
		const firstInput = screen.getByRole("spinbutton", {
			name: "X Y X Y X Y X Y",
		})
		expect(firstInput).toHaveValue(5)
		const changeInput = screen.getAllByRole("spinbutton")
		expect(changeInput[7]).toHaveValue(31)
	})
	test("should call remove() with the proper index", async () => {
		const remove = jest.fn()
		renderCoordinates({ remove })
		const removeButton = screen.getAllByRole("button")
		fireEvent.click(removeButton[0])
		expect(remove).toHaveBeenCalledWith(0)
		fireEvent.click(removeButton[3])
		expect(remove).toHaveBeenCalledWith(3)
	})
	test("should call update() with the proper value, index, x=0 or y=1", async () => {
		const update = jest.fn()
		renderCoordinates({ update })
		const changeInput = screen.getAllByRole("spinbutton")
		fireEvent.change(changeInput[1], { target: { value: 10 } })
		expect(update).toHaveBeenCalledWith(10, 0, 0)
	})
})
