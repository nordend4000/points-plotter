import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import App from "../App"

describe("<APP/>", () => {
	test("should display a div with data-testid = App", async () => {
		render(<App />)
		const appContainer = screen.getByTestId(/app/i)
		expect(appContainer).toBeInTheDocument()
	})
})
