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


const Entertainments: NextPage = () => {
  const { data: sessionData } = useSession();

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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <SlingshotGame />
      </Box>
    </>
  );
};

export default Entertainments;