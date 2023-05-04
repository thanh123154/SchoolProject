import { Box, Paper } from '@mantine/core'
import react, { useState } from 'react'
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

export const CalendarScheduler = () => {
	const [scheduleData, setScheduleData] = useState<Array<Object>>([
		// {
		// 	Id: 1,
		// 	Subject: 'Meeting - 1',
		// 	StartTime: new Date(2018, 1, 15, 10, 0),
		// 	EndTime: new Date(2018, 1, 16, 12, 30),
		// 	IsAllDay: false
		// },
	])
	const eventSettings = { dataSource: scheduleData }
	
	return (
		<ScheduleComponent 
			actionComplete={(e) => console.log(e)}
			selectedDate= {new Date(2018, 1, 15)}
			eventSettings={eventSettings}
		>
			<Inject services={[Day, Week, WorkWeek, Month]} />
		</ScheduleComponent>
	)
}