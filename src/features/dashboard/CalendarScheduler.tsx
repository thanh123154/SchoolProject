import { Box, Paper } from '@mantine/core'
import react, { useState } from 'react'
import { ScheduleComponent, Day, Week, WorkWeek, Month, Inject, Agenda } from '@syncfusion/ej2-react-schedule';

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
	const eventSettings = { 
		dataSource: scheduleData,
	}
	
	const handleScheduleChange = (event) => {
		//console.log(event)
		if(event.addedRecords?.length > 0) {
			console.log({addedRecords: event.addedRecords})
		}
		if(event.deletedRecords?.length > 0) {
			console.log({deletedRecords: event.deletedRecords})
		}
		if(event.changedRecords?.length > 0) {
			console.log({changedRecords: event.changedRecords})
		}
	}

	return (
		<ScheduleComponent 
			actionComplete={(e) => handleScheduleChange(e)}
			eventSettings={eventSettings}
		>
			<Inject services={[Day, Week, WorkWeek, Month, Agenda]} />		
		</ScheduleComponent>
	)
}