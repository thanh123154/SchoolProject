import { Box, Flex, Grid } from '@mantine/core'
import react, { useState } from 'react'
import truncate from 'truncate';

export const FlashCard = (props) => {
	return (
		<Box sx={{
			backgroundColor: `${props.flashCard.color}`,
			color: "white",
			borderRadius: "16px",
			width: "100%",
			height: "200px",
			padding: "8px",
			display: "flex",
			flexDirection: "column",
			gap: "8px"
		}}>
			<Box sx={{fontSize: "1.1rem", borderBottom: "1px solid #9c9c9c", fontWeight: "bold "}}>
				{props.flashCard.title}
			</Box>
			<Box>
				{truncate(props.flashCard.content, 200)}
			</Box>
		</Box>
	)
}