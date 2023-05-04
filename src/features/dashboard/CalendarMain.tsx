import { Box, Flex } from '@mantine/core'
import react from 'react'
import { CalendarScheduler } from './CalendarScheduler'
import { CalendarMenu } from './CalendarMenu'
import { CalendarUpcoming } from './CalendarUpcoming'

const calendarList = [
	{
		name: "First Calendar"
	},
	{
		name: "Second Calendar"
	},
	{
		name: "Third Calendar"
	},
	{
		name: "My Calendar"
	},
	{
		name: "Test Calendar"
	},
	{
		name: "ABC Calendar"
	},
]

export const CalendarMain = () => {
	return (
		<Flex  sx={{minHeight: "100vh"}}>
			<CalendarMenu calendarList={calendarList} />    
			<Box sx={(theme) => ({
				padding: "0",
				width: "100%"
			})}>
				<CalendarScheduler />
			</Box>
			<CalendarUpcoming />
		</Flex>
	)
}