import { Box, Button, Flex } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons'
import react, { useState } from 'react'
import { CreateScheduleModal } from '../../layouts/components/CreateScheduleModal';


export const CalendarMenu = (props: Array<any>) => {
	const [opened, {open, close}] = useDisclosure(false);

	console.log(props.calendarList)
	const selectCalendar = () => {

	}

	const renderCalendars = () => {
		const calendarToRender = props.calendarList.map((calendar, index) => {
			return (
				<Box 
					key={index} 
					sx={(theme) => ({
						backgroundColor: theme.colorScheme === 'dark' ? "#2a2a2b" : "#808080",
						cursor: "pointer",
						padding: "16px",
						":hover": {
							backgroundColor: theme.colorScheme === 'dark' ? "#494949" : "#808080",
						}
					})}
					onClick={() => selectCalendar()}
				>
					{calendar.name}
				</Box>
			)
		})
		return (
			<Box>
				<Flex direction="column">
					{calendarToRender}
				</Flex>
			</Box>
		)
	}
	return (
		<>
			<CreateScheduleModal opened={opened} open={open} close={close}/>
			<Box sx={(theme) => ({
				backgroundColor: theme.colorScheme === 'dark' ? "#2a2a2b" : "#808080",
				width: "20%",
				//padding: "16px"
			})}>
				<Box sx={(theme) => ({
					backgroundColor: theme.colorScheme === 'dark' ? "#212122" : "#808080",
					padding: "16px"
				})}>
					<Flex justify="space-between" align="center" gap={"32px"}>
						<div>Calendars</div>
						<Button
							sx={(theme) => ({
								borderRadius: "8px",
								paddingLeft: "8px",
								paddingRight: "8px",
							})}
							color="dark"
							variant='white'
							rightIcon={<IconPlus />}
							onClick={open}
						>
							Create
						</Button>
					</Flex>
				</Box>
				{renderCalendars()}
			</Box>
		</>
	)
}