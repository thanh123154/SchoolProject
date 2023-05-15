import { type NextPage } from "next";
import Head from "next/head";
import { Box, Button, Flex, Text } from "@mantine/core";
import { Header } from "../layouts";
import { useSession } from "next-auth/react";
import react, { useEffect, useState } from 'react'
import PomodoroTimer from "../layouts/components/PomodoroTimer";

const Pomodoro: NextPage = () => {
	const { data: sessionData } = useSession();

  	return (
		<>
			<Head>
				<title>SchoolUtils: Pomodoro</title>
				<meta name="description" content="Zenithereum" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{sessionData ? <Header /> : <></>}
			<Box>
				<PomodoroTimer />
			</Box>
		</>
	);
};

export default Pomodoro;