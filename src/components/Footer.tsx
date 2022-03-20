import React, { FC } from "react"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Link from "@material-ui/core/Link"
import Divider from "@material-ui/core/Divider"
import TimelineIcon from "@material-ui/icons/Timeline"
import GitHubIcon from "@material-ui/icons/GitHub"

const Footer: FC = () => {
	return (
		<footer>
			<Box
				display='flex'
				justifyContent={"space-evenly"}
				alignItems={"center"}
				mt={2}
				mx={3}>
				<Typography variant='body1'>
					Thanks to{" "}
					<Link href='https://felfel.ch' underline='hover'>
						FELFEL
					</Link>{" "}
					Team for this nice project, I really enyoyed creating it.
				</Typography>
			</Box>
			<Box my={3}>
				<Divider />
			</Box>
			<Typography variant='subtitle1'>
				<Box
					display='flex'
					justifyContent={"space-between"}
					alignItems={"center"}>
					<Link
						href='https://github.com/nordend4000/points-plotter'
						underline='hover'>
						<Box
							display='flex'
							justifyContent={"center"}
							alignItems={"center"}
							mx={3}>
							<Box mr={2}>
								<GitHubIcon color='primary' />
							</Box>
							Source Code
						</Box>
					</Link>
					<Link href='https://romaingioux.dev' underline='hover'>
						<Box
							display='flex'
							justifyContent={"center"}
							alignItems={"center"}
							mx={3}>
							<Box mr={2}>
								<TimelineIcon color='primary' />
							</Box>
							Romain GIOUX - Web Developer &copy; 2022
						</Box>
					</Link>
				</Box>
			</Typography>
		</footer>
	)
}

export default Footer
