import React, { FC, useState } from "react"
import { ITabPanelProps, ILayoutProps } from "../interfaces"
import Plotter from "./Plotter"
import axios from "axios"
import { updateStore } from "../utils/utils"
import { makeStyles, Theme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import AddIcon from "@material-ui/icons/Add"
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation"
import CloudDownloadIcon from "@material-ui/icons/CloudDownload"
import Feedback from "./Feedback"

function TabPanel(props: ITabPanelProps) {
	const { children, activeTab, index, ...other } = props
	return (
		<div
			role='tabpanel'
			hidden={activeTab !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}>
			{activeTab === index && <Box>{children}</Box>}
		</div>
	)
}

function a11yProps(index: any) {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`,
	}
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
}))

const Layout: FC<ILayoutProps> = ({
	activeTab,
	setActiveTab,
	tab,
	setTab,
	store,
	setStore,
}) => {
	const [message, setMessage] = useState<string | null>(null)
	const [open, setOpen] = useState<boolean>(false)
	const classes = useStyles()

	const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
		// IF CLICK ON NEW TAB : ADD NEW TAB + UPDATE STORE + setActive TAB to lenght - 1
		if (newValue === tab.length - 1) {
			openNewTab()
			setActiveTab(tab.length - 1)
			return
		}
		setActiveTab(newValue)
	}
	const openNewTab = () => {
		const shallowCopy = [...tab]
		shallowCopy.splice(shallowCopy.length - 1, 0, `TAB ${shallowCopy.length}`)
		setTab(shallowCopy)
		setStore([...store, [[0, 0]]])
	}
	const closeTab = (id: number) => {
		const newTabArray: string[] = []
		tab.forEach((el, idx) => {
			if (idx < id) newTabArray.push(el)
			if (idx >= id) newTabArray.push(`TAB ${idx + 1}`)
			if (idx === tab.length - 3) newTabArray.push("NEW TAB")
		})
		// SAVE NEW TAB ARRAY ORDER
		const slicedArray = newTabArray.slice(0, newTabArray.length - 2)
		if (slicedArray.length === 0) slicedArray.push("NEW TAB")
		setTab(slicedArray)
		// HANDLE TAB JUMP WHEN CLOSED and ALLOW NEW TAB ALONE TO BE 0
		let newValue = id
		if (id === slicedArray.length - 1) newValue = slicedArray.length - 2
		if (id === slicedArray.length + 1) newValue = 0
		if (newValue === -1) newValue = 0
		setActiveTab(newValue)
		// UPDATE STORE
		const updatedStore = store.filter((el, idx) => idx !== id)
		setStore(updatedStore)
	}
	// FETCH DATA FROM SERVER & APPEND TO THE LIST OF POINT FOR THE ACTIVE TAB
	const donwloadData = (id: number) => {
		axios
			.get(`${process.env.REACT_APP_DOWNLOAD_API}`)
			.then(response => {
				const addPointToTabArray = [...store[activeTab], ...response.data]
				setStore(updateStore(store, addPointToTabArray, activeTab))
				setMessage("Data has been appended to the list of points.")
				setOpen(true)
			})
			.catch(error => {
				setMessage(`Please try again : ${error}.`)
				setOpen(true)
			})
	}

	return (
		<div className={classes.root}>
			<AppBar position='static' color='default'>
				<Tabs
					value={activeTab}
					onChange={handleChangeTab}
					indicatorColor='primary'
					textColor='primary'
					variant='scrollable'
					scrollButtons='auto'
					aria-label='scrollable auto tabs example'>
					{tab.map((el, id) => (
						<Tab
							key={id}
							label={el}
							icon={el === "NEW TAB" ? <AddIcon /> : ""}
							{...a11yProps(id)}
						/>
					))}
				</Tabs>
			</AppBar>
			<Box p={2}>
				<Paper elevation={3}>
					<Box p={2}>
						{tab.length > 1 ? (
							tab.map((el, id) => (
								<TabPanel activeTab={activeTab} index={id} key={id}>
									<Box
										mt={2}
										mb={3}
										mr={3}
										display='flex'
										justifyContent='space-between'>
										<Button
											color='primary'
											onClick={() => donwloadData(id)}
											size='medium'
											variant='outlined'
											startIcon={<CloudDownloadIcon />}>
											Donwload
										</Button>
										<Button
											color='primary'
											onClick={() => closeTab(id)}
											size='medium'
											variant='outlined'
											endIcon={<CancelPresentationIcon />}>
											Close {el}
										</Button>
									</Box>
									<Plotter
										tab={el}
										activeTab={activeTab}
										store={store}
										setStore={setStore}
									/>
								</TabPanel>
							))
						) : (
							<Typography component='div'>
								<Box textAlign='center' fontSize='h6.fontSize' my={4}>
									To start adding point, please open a new Tab
									<Box display='inline' ml={2}>
										<Button
											color='primary'
											size='large'
											variant='outlined'
											onClick={openNewTab}
											startIcon={<AddIcon />}>
											{" "}
											New Tab
										</Button>
									</Box>
								</Box>
							</Typography>
						)}
					</Box>
				</Paper>
			</Box>
			<Feedback
				message={message}
				open={open}
				setMessage={setMessage}
				setOpen={setOpen}
			/>
		</div>
	)
}

export default Layout
