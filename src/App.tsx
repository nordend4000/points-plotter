import React, { FC, useState } from "react"
import Layout from "./components/Layout"
import Footer from "./components/Footer"
import "./styles.scss"

const TAB_START = ["TAB 1", "TAB 2", "TAB 3", "TAB 4", "NEW TAB"]

const STORE_START = [
	[
		[10, 12],
		[25, 1],
		[80, 8],
		[40, 10],
	],
	[[0, 0]],
	[[0, 0]],
	[[0, 0]],
]

const App: FC = () => {
	const [store, setStore] = useState<number[][][]>(STORE_START)
	const [activeTab, setActiveTab] = useState<number>(0)
	const [tab, setTab] = useState<string[]>(TAB_START)

	return (
		<>
			<div className='App' data-testid='app'>
				<Layout
					store={store}
					setStore={setStore}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					tab={tab}
					setTab={setTab}
				/>
			</div>
			<Footer />
		</>
	)
}

export default App
