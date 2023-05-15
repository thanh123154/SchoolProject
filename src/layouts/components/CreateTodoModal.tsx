import { Box, Button, CloseButton, Modal, Paper, TextInput, Select } from '@mantine/core'
import react, { useState } from 'react'

export const CreateTodoModal = (props) => {
	const [todoTask, setTodoTask] = useState("")
	const [todoPriority, setTodoPriority] = useState('')

	const handleCreateNewTodo = () => {
		if(!todoTask) return
		
		console.log({
			todoTask,
			todoPriority: todoPriority || "low",
		})

		props.close()
		setTodoTask("")
		setTodoPriority("")
	}

	return (
		<Modal opened={props.opened} onClose={props.close} title="Create New Todo" centered>
			<Box sx={{
				display: "flex",
				flexDirection: "column",
				gap: "16px",
			}}>
				<Box sx={{
					display: "grid",
					gridGap: "8px",
					gridTemplateColumns: "1fr 30%",
				}}>
					<TextInput 
						value={todoTask} 
						onChange={(event) => setTodoTask(event.currentTarget.value)} 
						placeholder='Todo Task...' 
						rightSection={todoTask && <CloseButton onClick={() => setTodoTask('')}/>}
					/>
					<Select 
						placeholder="Priority"
						data={[
						  { value: 'high', label: 'High' },
						  { value: 'medium', label: 'Medium' },
						  { value: 'low', label: 'Low' },
						]}
						value={todoPriority}
						onChange={setTodoPriority}
					/>
				</Box>
				<Box sx={{display: "flex", justifyContent: "flex-end"}}>
					<Button
						sx={(theme) => ({
							borderRadius: "8px",
							paddingLeft: "8px",
							paddingRight: "8px",
						})}
						color="dark"
						variant='white'
						onClick={() => handleCreateNewTodo()}
					>
						Create
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}