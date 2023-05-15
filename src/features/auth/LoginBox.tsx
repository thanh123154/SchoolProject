import { Box, Paper } from '@mantine/core'
import { IconBrandGoogle } from '@tabler/icons'
import react, { useState } from 'react'
import { signIn, signOut, useSession } from "next-auth/react";

export const LoginBox = () => {	

	const handleLogin = () => {
		signIn("google")
	}

	const renderLoginOptions = () => {
		const loginOptions = [
			{
				name: "Google",
			},
			{
				name: "Facebook",
			},
		]
		return loginOptions.map((option, index) => {
			return (
				<Box 
					key={index} 
					onClick={() => handleLogin()} 
					sx={(theme) => ({
						backgroundColor: theme.colorScheme === 'dark' ? "#2e3036" : "#808080",
						padding: "8px",
						display: "flex",
						justifyContent: "center",
						borderRadius: "8px",
						gap: "16px",
						cursor: "pointer",
						transition: "ease-in-out 200ms",
						":hover": {
							backgroundColor: theme.colorScheme === 'dark' ? "#1d1e22" : "#808080",
						}
					})}
				>
					{`Login As ${option.name}`}
				</Box>
			)
		})
	}

	return (
		<Box sx={(theme) => ({
			backgroundColor: theme.colorScheme === 'dark' ? "#25262b" : "#808080",
			minWidth: "440px",
			minHeight: "160px",
			borderRadius: "16px",
			display: "flex",
			flexDirection: "column",
			padding: "16px",
			gap: "16px",
			justifyContent: "center",
		})}>
			{renderLoginOptions()}
		</Box>
	)
}