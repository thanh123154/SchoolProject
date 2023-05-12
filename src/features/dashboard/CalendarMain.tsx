import { Box, Flex, Grid } from '@mantine/core'
import react, { useState } from 'react'
import { CalendarScheduler } from './CalendarScheduler'
import { CalendarMenu } from './CalendarMenu'
import { CalendarTodos } from './CalendarTodos'

const placeholder_calendarList = [
	{
		name: "Schedule 1",
		uuid: 1,
		data: [
			{ //TODO: setScheduleData to .filter() when delete in handleScheduleChange()
				Subject: "Schedule 1",
				StartTime: "2023-05-07T18:00:00.000Z",
				EndTime: "2023-05-08T03:00:00.000Z",
				IsAllDay: false,
				StartTimezone: null,
				EndTimezone: null,
				Description: "Test Schedule\n",
				RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO;INTERVAL=1;",
				Id: 2,
				Guid: "e85c76aa-aaeb-afe0-a9af-51bfe8faa079",
				RecurrenceID: 1,
				RecurrenceException: "20230507T180000Z",
				FollowingID: null
			},
			{
				Subject: "Test Schedule",
				Location: "Ha Noi",
				StartTime: "2023-05-09T20:00:00.000Z",
				EndTime: "2023-05-09T21:30:00.000Z",
				IsAllDay: false,
				StartTimezone: null,
				EndTimezone: null,
				Description: "Schedule for testing",
				RecurrenceRule: "FREQ=WEEKLY;BYDAY=WE;INTERVAL=1;",
				Id: 4,
				Guid: "e9d7eda7-8f19-9e52-6b02-599a01588930",
				RecurrenceID: 3,
				RecurrenceException: "20230509T200000Z",
				FollowingID: null
			}
		]
	},
	{
		name: "Schedule 2",
		uuid: 2,
		data: [
			{
				Subject: "Schedule of test",
				StartTime: "2023-05-07T18:00:00.000Z",
				EndTime: "2023-05-08T03:00:00.000Z",
				IsAllDay: false,
				StartTimezone: null,
				EndTimezone: null,
				Description: "Test Schedule\n",
				RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO;INTERVAL=1;",
				Id: 2,
				Guid: "e85c76aa-aaeb-afe0-a9af-51bfe8faa079",
				RecurrenceID: 1,
				RecurrenceException: "20230507T180000Z",
				FollowingID: null
			},
		]
	},
	{
		name: "Schedule 3",
		uuid: 3,
		data: []
	}
]

export const CalendarMain = () => {
	const [selectedSchedule, setSelectedSchedule] = useState(placeholder_calendarList[0])
	const [calendarList, setCalendarList] = useState(placeholder_calendarList)

	return (
		<Box sx={{
			minHeight: "100vh",
			display: "grid",
			gridTemplateColumns: "auto 1fr 20%",
		}}>
			<CalendarMenu calendarList={calendarList} _setSelectedSchedule={setSelectedSchedule} selectedSchedule={selectedSchedule}/>    
			<Box sx={(theme) => ({
				padding: "0",
				// width: "100%"
			})}>
				<CalendarScheduler selectedSchedule={selectedSchedule}/>
			</Box>
			<CalendarTodos />
		</Box>
	)
}