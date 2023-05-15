import { Box, Button, Flex, CloseButton, ActionIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { IconPencil, IconPlus } from '@tabler/icons'
import react, { useState } from 'react'
import { CreateScheduleModal } from '../../layouts/components/CreateScheduleModal';


export const FlashCardMenu = (props) => {
	const [opened, {open, close}] = useDisclosure(false);
	const [isEditingSubject, setIsEditingSubject] = useState(false)

	const renderSubjects = () => {
		return (
			<Box sx={{
				display: "flex",
				flexDirection: "column",
			}}>
				{
					props.subjects?.map(subject => {
						return (
								<Box 
									sx={(theme) => ({
										display: "flex",
										minHeight: "60px",
										padding: "16px",
										alignItems: "center",
										justifyContent: "space-between",
										":hover": {
											backgroundColor: theme.colorScheme === 'dark' ? "#494949" : "#808080",
										},
										cursor: "pointer",
										transition: "ease-in-out 250ms",
										backgroundColor: theme.colorScheme === 'dark' 
										? subject.subjectId === props.selectedSubject?.subjectId ? "#3f3f41" : "#2a2a2b" 
										: "#808080",
									})}
									onClick={() => props._setSelectedSubject(subject)}
								>
									{subject.name}
									{
										isEditingSubject ? (
											<ActionIcon>
												<IconPencil onClick={(e) => {}}/>
											</ActionIcon>
										) : <></>
									}
								</Box>
						)
					})
				}
			</Box>
		)
	}

	return (
		<>
			<Box sx={(theme) => ({
				backgroundColor: theme.colorScheme === 'dark' ? "#2a2a2b" : "#808080",
				minHeight: "100%",
			})}>
				<Box sx={(theme) => ({
					backgroundColor: theme.colorScheme === 'dark' ? "#212122" : "#808080",
					padding: "16px"
				})}>
					<Flex justify="space-between" align="center" gap={"32px"}>
						<div>Subjects</div>
						<Box sx={{display: "flex", gap: "8px"}}>
							<Button
								sx={(theme) => ({
									borderRadius: "8px",
									paddingLeft: "4px",
									paddingRight: "4px",
								})}
								color="dark"
								variant='subtle'
								onClick={() => setIsEditingSubject(!isEditingSubject)}
							>
								<IconPencil fill={`${isEditingSubject ? "gray" : ""}`}/>
							</Button>
							<Button
								type="button"
								sx={(theme) => ({
									borderRadius: "8px",
									paddingLeft: "4px",
									paddingRight: "4px",
								})}
								style={{
									textTransform: 'none',
								}}
								color="dark"
								variant='white'
								onClick={open}
							>
								Create
							</Button>
						</Box>
					</Flex>
				</Box>
				{renderSubjects()}
			</Box>
		</>
	)
}