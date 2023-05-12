import { Box, Checkbox, Flex, Button } from '@mantine/core'
import react, { useState } from 'react'
import { TodoCard } from '../../layouts/components/TodoCard'
import { IconPencil, IconPlus } from '@tabler/icons'
import { useDisclosure } from '@mantine/hooks'
import { CreateTodoModal } from '../../layouts/components/CreateTodoModal'

const Dummy_TodoList = [
	{
		task: "Do Homework",
		priority: "high",
		isCompleted: false,
		uuid: 0,
	},
	{
		task: "Clean the house",
		priority: "medium",
		isCompleted: false,
		uuid: 1,
	},
	{
		task: "Eat lunch",
		priority: "low",
		isCompleted: false,
		uuid: 2,
	},
	{
		task: "Take a shower",
		priority: "high",
		isCompleted: false,
		uuid: 3,
	},
	{
		task: "Eat Dinner",
		priority: "low",
		isCompleted: false,
		uuid: 4,
	},
	{
		task: "Take out the trash",
		priority: "low",
		isCompleted: true,
		uuid: 5,
	}
]

export const CalendarTodos = () => {
	const [todoList, setTodoList] = useState(Dummy_TodoList)
	const [isEditingTodoList, setIsEditingTodoList] = useState(false)
	const [opened, {open, close}] = useDisclosure(false);


	const renderTodoList = () => {
		return todoList.map((todo) => {
			return (
				<Box 
					key={todo.uuid}
					sx={(theme) => ({
						display: "flex",
						flexDirection: "column",
						gap: "8px"
					})}
				>
					<TodoCard todo={todo} isEditingTodo={isEditingTodoList}/>
				</Box>
			)
		})
	}
	return (
		<>
			<CreateTodoModal opened={opened} open={open} close={close}/>
			<Box sx={(theme) => ({
				backgroundColor: theme.colorScheme === 'dark' ? "#2a2a2b" : "#808080",
				// width: "25%",
			})}>
				<Box sx={(theme) => ({
					backgroundColor: theme.colorScheme === 'dark' ? "#212122" : "#808080",
					padding: "16px"
				})}>
					<Flex justify="space-between" align="center">
						<div>To Dos</div>
						<Box sx={{display: "flex", gap: "8px"}}>
							{isEditingTodoList && <Button
								type="button"
								sx={(theme) => ({
									borderRadius: "8px",
									paddingLeft: "4px",
									paddingRight: "4px",
								})}
								color="red"
								variant='filled'
								// rightIcon={<IconPlus />}
								onClick={() => console.log("delete completed")}
							>
								Delete Completed
							</Button>}
							<Button
								sx={(theme) => ({
									borderRadius: "8px",
									paddingLeft: "4px",
									paddingRight: "4px",
								})}
								color="dark"
								variant='subtle'
								//rightIcon={<IconPlus />}
								onClick={() => setIsEditingTodoList(!isEditingTodoList)}
							>
								<IconPencil fill={`${isEditingTodoList ? "gray" : ""}`}/>
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
								<IconPlus />
							</Button>
						</Box>
					</Flex>
				</Box>
				<Box sx={(theme) => ({
					display: "flex",
					flexDirection: "column",
					gap: "8px",
					padding: "8px"
				})}>
					{renderTodoList()}
				</Box>
			</Box>
		</>
	)
}