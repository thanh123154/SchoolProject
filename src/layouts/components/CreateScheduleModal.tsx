import { Box, Button, CloseButton, Modal, Paper, TextInput } from '@mantine/core'
import react, { useState } from 'react'

export const CreateScheduleModal = (props) => {
	const [scheduleName, setScheduleName] = useState("")

	const handleCreateNewSchedule = (scheduleName: String) => {
		if(!scheduleName) return

		console.log(scheduleName)
		props.close()
		setScheduleName("")
	}

	return (
		<Modal opened={props.opened} onClose={props.close} title="Create New Schedule" centered>
			<Box sx={{
				display: "flex",
				flexDirection: "column",
				gap: "16px",
			}}>
				<TextInput 
					value={scheduleName} 
					onChange={(event) => setScheduleName(event.currentTarget.value)} 
					placeholder='Schedule Name' 
					rightSection={scheduleName && <CloseButton onClick={() => setScheduleName('')}/>}
				/>
				<Box sx={{display: "flex", justifyContent: "flex-end"}}>
					<Button
						sx={(theme) => ({
							borderRadius: "8px",
							paddingLeft: "8px",
							paddingRight: "8px",
						})}
						color="dark"
						variant='white'
						onClick={() => handleCreateNewSchedule(scheduleName)}
					>
						Create
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}