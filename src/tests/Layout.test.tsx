import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { server, rest } from "./mocks/server"
import "@testing-library/jest-dom/extend-expect"
import Layout from "../components/Layout"
import { ILayoutProps } from "../interfaces"

function renderLayout(props: Partial<ILayoutProps> = {}) {
	const defaultProps: ILayoutProps = {
		store: [
			[
				[1, 1],
				[10, 20],
				[30, 40],
			],
			[[0, 0]],
			[[0, 0]],
			[[0, 0]],
		],
		setStore() {
			return
		},
		activeTab: 3,
		setActiveTab() {
			return
		},
		tab: ["TAB 1", "TAB 2", "TAB 3", "TAB 4", "NEW TAB"],
		setTab() {
			return
		},
	}
	return render(<Layout {...defaultProps} {...props} />)
}

describe("<Layout/>", () => {
	test("should display 5 tabs and active tab should be TAB 4", () => {
		renderLayout()
		const allTabs = screen.getAllByRole("tab")
		expect(allTabs).toHaveLength(5)
		const activeTab = screen.getByRole("tabpanel", { name: "TAB 4" })
		expect(activeTab).toBeInTheDocument()
	})
	test("should display a close Tab 2 Button and a download button should be the first one", () => {
		renderLayout()
		const closeBtn = screen.getByRole("button", { name: "Close TAB 4" })
		expect(closeBtn).toBeInTheDocument()
		const downloadBtn = screen.getByRole("button", { name: "Donwload" })
		expect(downloadBtn).toBeInTheDocument()
	})

	test("should call setActiveTab() with the proper index", () => {
		const setActiveTab = jest.fn()
		renderLayout({ setActiveTab })
		const tab = screen.getAllByRole("tab")
		fireEvent.click(tab[0])
		expect(setActiveTab).toHaveBeenCalledWith(0)
		fireEvent.click(tab[3])
		expect(setActiveTab).toHaveBeenCalledWith(3)
	})
	test("should call setTab with a new tab array adding TAB 5", () => {
		const setTab = jest.fn()
		renderLayout({ setTab })
		const tab = screen.getAllByRole("tab")
		fireEvent.click(tab[4])
		expect(setTab).toHaveBeenCalledWith([
			"TAB 1",
			"TAB 2",
			"TAB 3",
			"TAB 4",
			"TAB 5",
			"NEW TAB",
		])
	})
	test("should call setTab with a new tab array removing TAB 4", () => {
		const setTab = jest.fn()
		renderLayout({ setTab })
		const closeBtn = screen.getByRole("button", { name: "Close TAB 4" })
		fireEvent.click(closeBtn)
		expect(setTab).toHaveBeenCalledWith(["TAB 1", "TAB 2", "TAB 3", "NEW TAB"])
	})
})

describe("Fetching data using MSW to mock server response", () => {
	test("Fetch data with error, not call setStore() and get feedback-error", async () => {
		const setStore = jest.fn()
		renderLayout({ setStore })
		const downloadBtn = screen.getByRole("button", { name: "Donwload" })
		fireEvent.click(downloadBtn)
		server.use(
			rest.get(`${process.env.REACT_APP_DOWNLOAD_API}`, (req, res, ctx) => {
				return res(ctx.status(500), ctx.json({ message: "http error" }))
			}),
		)
		const feedback = await screen.findByTestId("feedback-error")
		expect(feedback).toBeVisible()
		expect(setStore).not.toBeCalled()
	})
	test("Fetch data, call setStore() and get feedback-success", async () => {
		const setStore = jest.fn()
		renderLayout({ setStore })
		const downloadBtn = screen.getByRole("button", { name: "Donwload" })
		fireEvent.click(downloadBtn)
		const feedback = await screen.findByTestId("feedback-success")
		expect(setStore).toBeCalled()
		expect(feedback).toBeVisible()
	})
})
