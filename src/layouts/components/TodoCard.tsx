import { Box, Checkbox, Flex } from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import react, { useState, useEffect } from 'react'

export const TodoCard = (props) => {
	const [priorityColor, setPriorityColor] = useState("")
	const [isChecked, setIsChecked] = useState(props.todo.isCompleted)
	useEffect(() => {
		if(props.todo.isCompleted) {
			setPriorityColor("#549138") 
		} else {
			switch (props.todo.priority) {
				case "high":
					setPriorityColor("#681414")
					break
				case "medium":
					setPriorityColor("#a36c2d")
					break
				case "low":
					setPriorityColor("#141414")
					break
			}
		}
	}, [props.todo.isCompleted])

	const handleDeleteTodo = (todoId) => {
		console.log(todoId)
	}

	return (
		<Box sx={(theme) => ({
			display: "flex",
			padding: "12px 8px",
			borderRadius: "8px",
			color: "white",
			alignItems: "center",
			justifyContent: "space-between",
			backgroundColor: theme.colorScheme === 'dark' ? priorityColor : "#808080",
		})}>
			<div>
				{props.todo.task}
			</div>
			<Box sx={{
				display: "flex",
				gap: "8px",
				alignItems: "center"
			}}>
				<Checkbox 
					checked={isChecked} 
					onChange={(event) => setIsChecked(event.currentTarget.checked)}
				/>
				{
					props.isEditingTodo ? <IconTrash width={"20px"} height={"20px"} cursor={"pointer"} onClick={() => handleDeleteTodo(props.todo.uuid)}/> : <></>
				}
			</Box>
		</Box>
	)
}
