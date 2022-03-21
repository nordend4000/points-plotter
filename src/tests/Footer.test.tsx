import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Footer from "../components/Footer"

describe("<Footer/>", () => {
	test("should display a footer with data-testid = Footer", () => {
		render(<Footer />)
		const footerContainer = screen.getByTestId(/Footer/i)
		expect(footerContainer).toBeInTheDocument()
	})
	test("should link to source code have a valid href", () => {
		render(<Footer />)
		const linkToSourceCode = screen.getByRole("link", { name: "Source Code" })
		//@ts-ignore:next-line
		expect(linkToSourceCode.href).toBe(
			"https://github.com/nordend4000/points-plotter",
		)
	})
})
