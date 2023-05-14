import { Box, Flex, Grid } from '@mantine/core'
import react, { useState } from 'react'
import { FlashCard } from './FlashCard'

export const FlashCardList = (props) => {
	const renderFlashCardList = () => {
		return (
			<Box sx={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
				placeItems: "center",
				padding: "24px",
				gap: "20px",
			}}>
				{
					props.flashCardList?.map(flashCard => {
						return <FlashCard flashCard={flashCard}/>
					})
				}
			</Box>
		)
	}
	return (
		<Box sx={{
			
		}}>
			<Box></Box>
			{renderFlashCardList()}
		</Box>
	)
}