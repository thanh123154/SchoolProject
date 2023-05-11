import { Box, Paper } from '@mantine/core'
import react, { useState } from 'react'
import { ScheduleComponent, Day, Week, WorkWeek, Month, Inject, Agenda } from '@syncfusion/ej2-react-schedule';

export const CalendarScheduler = () => {
	const [scheduleData, setScheduleData] = useState<Array<Object>>([
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
		}
	])
	const eventSettings = { 
		dataSource: scheduleData,
	}
	
	const handleScheduleChange = (event) => {
		if(event.requestType == "dateNavigate") return
		console.log(event)
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