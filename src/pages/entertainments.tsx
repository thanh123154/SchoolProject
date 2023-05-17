import { type NextPage } from "next";
import Head from "next/head";
import { Box, Flex } from "@mantine/core";
import { Header } from "../layouts";
import { useSession } from "next-auth/react";
import { LoginBox } from "../features/auth/LoginBox";
import { FlashCardMenu } from "../features/flashCards/FlashCardMenu";
import react, { useState } from 'react'
import { FlashCardList } from "../features/flashCards/FlashCardList";
import SlingshotGame from "../features/entertainments/SlingshotGame";
import { EntertainmentsMenu } from "../features/entertainments/EntertainmentsMenu";
import BallGame from "../features/entertainments/BallGame";


const Entertainments: NextPage = () => {
  const [games, setGames] = useState([
    {
      id: "1",
      name: "Ball Game"
    },
    {
      id: "2",
      name: "Slingshot Game"
    },
  ])
  const [selectedGames, setSelectedGames] = useState(games[0])
  const { data: sessionData } = useSession();

  const gamesToRender = () => {
    switch(selectedGames?.id) {
      case "1":
        return <BallGame width={1000} height={700} />
      case "2":
        return <SlingshotGame />
    }
  }

  return (
    <>
      <Head>
        <title>SchoolUtils: Entertainments</title>
        <meta name="description" content="Zenithereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {sessionData ? <Header /> : <></>}

      <Box sx={{
        minHeight: "calc(100vh - 79px)",
        display: "grid",
        gridTemplateColumns: "auto 1fr"
      }}>
        <EntertainmentsMenu games={games} _setSelectedGame={setSelectedGames} selectedGame={selectedGames}/>
        {gamesToRender()}
      </Box>
    </>
  );
};

export default Entertainments;