import { Box, Paper } from '@mantine/core'
import react, { useEffect, useState } from 'react'
import { ScheduleComponent, Day, Week, WorkWeek, Month, Inject, Agenda, DragAndDrop } from '@syncfusion/ej2-react-schedule';

export const CalendarScheduler = (props) => {
	const [scheduleData, setScheduleData] = useState(props.selectedSchedule?.data)
	useEffect(() => {
		setScheduleData(props.selectedSchedule?.data)
	}, [props.selectedSchedule?.data])
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
			allowDragAndDrop={true}
		>
			<Inject services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop]} />		
		</ScheduleComponent>
	)
}