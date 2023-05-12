import { Box, Button, Flex, CloseButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { IconPencil, IconPlus } from '@tabler/icons'
import react, { useState } from 'react'
import { CreateScheduleModal } from '../../layouts/components/CreateScheduleModal';


export const CalendarMenu = (props) => {
	const [opened, {open, close}] = useDisclosure(false);
	const [isEditingCalendarList, setIsEditingCalendarList] = useState(false)

	const selectCalendar = (id) => {
		const selectedCalendar = props.calendarList.filter((calendar) => calendar.uuid === id)
		props._setSelectedSchedule(selectedCalendar[0])
	}

	const handleDeleteCalendar = (event, id) => {
		event.stopPropagation();
		console.log(`deleted ${id}`)
	}

	const renderCalendars = () => {
		const calendarToRender = props.calendarList.map((calendar, index) => {
			return (
				<Box 
					key={index} 
					sx={(theme) => ({
						backgroundColor: theme.colorScheme === 'dark' 
										? calendar.uuid === props.selectedSchedule?.uuid ? "#3f3f41" : "#2a2a2b" 
										: "#808080",
						cursor: "pointer",
						padding: "16px",
						":hover": {
							backgroundColor: theme.colorScheme === 'dark' ? "#494949" : "#808080",
						},
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						transition: "ease-in-out 250ms"
					})}
					onClick={() => selectCalendar(calendar.uuid)}
				>
					<Box sx={{minHeight: "28px", display: "flex", alignItems: "center"}}>
						{calendar.name}
					</Box>
					{
						isEditingCalendarList ? (
							<CloseButton onClick={(e) => handleDeleteCalendar(e, calendar.uuid)}/>
						) : <></>
					}
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
				// width: "20%",
				//padding: "16px"
			})}>
				<Box sx={(theme) => ({
					backgroundColor: theme.colorScheme === 'dark' ? "#212122" : "#808080",
					padding: "16px"
				})}>
					<Flex justify="space-between" align="center" gap={"32px"}>
						<div>Calendars</div>
						<Box sx={{display: "flex", gap: "8px"}}>
							<Button
								sx={(theme) => ({
									borderRadius: "8px",
									paddingLeft: "4px",
									paddingRight: "4px",
								})}
								color="dark"
								variant='subtle'
								//rightIcon={<IconPlus />}
								onClick={() => setIsEditingCalendarList(!isEditingCalendarList)}
							>
								<IconPencil fill={`${isEditingCalendarList ? "gray" : ""}`}/>
							</Button>
							<Button
								type="button"
								sx={(theme) => ({
									borderRadius: "8px",
									paddingLeft: "4px",
									paddingRight: "4px",
								})}
								color="dark"
								variant='white'
								// rightIcon={<IconPlus />}
								onClick={open}
							>
								Create
							</Button>
						</Box>
					</Flex>
				</Box>
				{renderCalendars()}
			</Box>
		</>
	)
}