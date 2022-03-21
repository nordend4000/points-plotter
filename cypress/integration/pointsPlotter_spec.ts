describe("Points Plotter : End to End test", () => {
	beforeEach(() => {
		cy.visit("https://points-plotter.netlify.app/")
	})
	//----------------------------------------------------------------------------------------
	//-------------------------------------- TESTS TABS --------------------------------------
	//----------------------------------------------------------------------------------------
	it("Click on NEW TAB, it add 1 to the Tab array and the selected tab got attribute tabindex=0", () => {
		cy.contains("NEW TAB").click()
		cy.get(".MuiTabs-flexContainer").find("button").should("have.length", 6)
		cy.get(".Mui-selected").invoke("attr", "tabindex").should("eq", "0")
	})
	it("Check if closing all tab it display just banner with add new tab", () => {
		cy.get(".MuiBox-root").find("button").should("have.length", 7)
		for (let i = 0; i < 4; i++) {
			cy.get(".MuiBox-root")
				.find("button")
				// eslint-disable-next-line no-loop-func
				.then(elements => {
					cy.wrap(elements[1]).click()
				})
		}
		cy.get(".MuiBox-root")
			.contains("To start adding point, please open a new Tab")
			.should("be.visible")
	})
	//----------------------------------------------------------------------------------------
	//-------------------------------------- TESTS INPUTS --------------------------------------
	//----------------------------------------------------------------------------------------
	it("Check for TAB 1 & TAB 3 : Number of inputs and value of first input", () => {
		cy.get(".MuiBox-root").find("input").should("have.length", 8)
		cy.get(".MuiBox-root").find("input").first().should("have.value", 10)
		cy.contains("TAB 3").click()
		cy.get(".MuiBox-root").find("input").should("have.length", 2)
		cy.get(".MuiBox-root").find("input").first().should("have.value", 0)
	})
	it("Display properly the value entered to the input", () => {
		cy.get(".MuiBox-root")
			.find("input")
			.first()
			.clear()
			.type("10")
			.should("have.value", "100")
		cy.get(".MuiBox-root")
			.find("input")
			.last()
			.clear()
			.type("20")
			.should("have.value", "200")
	})
	//----------------------------------------------------------------------------------------
	//-------------------------------------- TESTS CHART --------------------------------------
	//----------------------------------------------------------------------------------------
	it("Display the chart legend with the proper tab", () => {
		cy.get(".recharts-legend-item-text").should("have.text", "TAB 1")
		cy.contains("TAB 2").click()
		cy.get(".recharts-legend-item-text").should("have.text", "TAB 2")
		cy.contains("TAB 3").click()
		cy.get(".recharts-legend-item-text").should("have.text", "TAB 3")
	})
	it("Check max of X axis and Y axis on load and after typing new value", () => {
		cy.get(".recharts-xAxis").find("g").last().should("have.text", "80")
		cy.get(".recharts-yAxis").find("g").last().should("have.text", "12")
		cy.contains("TAB 2").click()
		cy.get(".MuiBox-root").find("input").first().clear().type("100")
		cy.get(".recharts-xAxis").find("g").last().should("have.text", "1000")
		cy.get(".MuiBox-root").find("input").last().clear().type("200")
		cy.get(".recharts-yAxis").find("g").last().should("have.text", "2000")
	})
	it("Click on chart add a point", () => {
		cy.contains("TAB 3").click()
		cy.get(".recharts-wrapper").click()
		cy.get(".MuiBox-root").find("input").should("have.length", 4)
	})
	//----------------------------------------------------------------------------------------
	//-------------------------------------- TESTS FETCH --------------------------------------
	//----------------------------------------------------------------------------------------
	it("Check if FETCHING DATA Display array of points on TAB 4 and render Sucess Feedback", async () => {
		cy.contains("TAB 4").click()
		cy.get(".MuiBox-root").find("button").first().click()
		await cy.intercept("GET", `${process.env.REACT_APP_DOWNLOAD_API}`, {
			statusCode: 201,
			body: {
				data: [
					[100, 2],
					[5, 3],
					[4, 7],
				],
			},
		})
		cy.get("[data-testid=feedback-success]").should("be.visible")
		cy.get(".MuiBox-root").find("input").should("have.length", 8)
		cy.get(".MuiBox-root").find("input").last().should("have.value", 7)
	})
	it("Check if FETCHING wrong url, it render Error Feedback and don't change UI", async () => {
		cy.contains("TAB 4").click()
		cy.get(".MuiBox-root").find("button").first().click()
		await cy.intercept(
			"GET",
			"https//:fetching_wrong_url_to_test_error_feedback",
		)
		cy.get("[data-testid=feedback-error]").should("be.visible")
		cy.get(".MuiBox-root").find("input").should("have.length", 2)
		cy.get(".MuiBox-root").find("input").last().should("have.value", 0)
	})
	//----------------------------------------------------------------------------------------
	//-------------------------------------- TESTS FOOTER --------------------------------------
	//----------------------------------------------------------------------------------------
	it("Check the href of source code is ok", () => {
		cy.contains("Source Code")
			.invoke("attr", "href")
			.should("eq", "https://github.com/nordend4000/points-plotter")
	})
})
