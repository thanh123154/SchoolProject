import { Box, Button, Flex, CloseButton, ActionIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { IconPencil, IconPlus } from '@tabler/icons'
import react, { useState } from 'react'
import { CreateScheduleModal } from '../../layouts/components/CreateScheduleModal';


export const EntertainmentsMenu = (props) => {
	const renderGames = () => {
		return (
			<Box sx={{
				display: "flex",
				flexDirection: "column",
			}}>
				{
					props.games?.map(game => {
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
									? game.id === props.selectedGame?.id ? "#3f3f41" : "#2a2a2b" 
									: "#808080",
								})}
								onClick={() => props._setSelectedGame(game)}
							>
								{game.name}
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
				minWidth: "246px",
			})}>
				<Box sx={(theme) => ({
					backgroundColor: theme.colorScheme === 'dark' ? "#212122" : "#808080",
					padding: "16px"
				})}>
					<Flex justify="space-between" align="center" gap={"32px"}>
						<div>Entertainments</div>
					</Flex>
				</Box>
				{renderGames()}
			</Box>
		</>
	)
}