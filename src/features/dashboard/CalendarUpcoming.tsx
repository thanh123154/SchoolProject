import { Box, Flex } from '@mantine/core'
import react from 'react'

export const CalendarUpcoming = () => {
	return (
		<Box sx={(theme) => ({
			backgroundColor: theme.colorScheme === 'dark' ? "#2a2a2b" : "#808080",
			width: "25%",
		})}>
			<Box sx={(theme) => ({
				backgroundColor: theme.colorScheme === 'dark' ? "#212122" : "#808080",
				padding: "16px"
			})}>
				<Flex justify="space-between" align="center">
					<div>Upcoming</div>
				</Flex>
			</Box>
		</Box>
	)
}