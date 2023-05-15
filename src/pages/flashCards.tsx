import { type NextPage } from "next";
import Head from "next/head";
import { Box, Flex } from "@mantine/core";
import { Header } from "../layouts";
import { useSession } from "next-auth/react";
import { LoginBox } from "../features/auth/LoginBox";
import { FlashCardMenu } from "../features/flashCards/FlashCardMenu";
import react, { useState } from 'react'
import { FlashCardList } from "../features/flashCards/FlashCardList";

const Dummy_subjects = [  
  {    
    name: "English",    
    subjectId: "1",    
    flashCards: [      
      {        
        id: "1",        
        title: "Parts of Speech",        
        content: "Noun, verb, adjective, adverb, pronoun, preposition, conjunction, interjection.",        
        color: "#8F3C3C",      
      },      
      {        
        id: "2",        
        title: "Simple Present Tense",        
        content: "I/You/We/They work. He/She/It works.",        
        color: "#3C8F75",      
      },      
      {        
        id: "3",        
        title: "Common Idioms",        
        content: "It's raining cats and dogs. Break a leg. Barking up the wrong tree. ",        
        color: "#734C7D",      
      },      
      {        
        id: "4",        
        title: "Famous Quotes",        
        content: "To be, or not to be: that is the question. - William Shakespeare. In three words I can sum up everything I've learned about life: it goes on. - Robert Frost.", 
        color: "#7D734C",      
      },    
    ],
  },
  {
    name: "Math",
    subjectId: "2",
    flashCards: [
      {
        id: "1",
        title: "Multiplication Table",
        content: "1 x 1 = 1, 1 x 2 = 2, 1 x 3 = 3, 2 x 1 = 2, 2 x 2 = 4, 2 x 3 = 6, 3 x 1 = 3, 3 x 2 = 6, 3 x 3 = 9",
        color: "#5E7D4C",
      },
      {
        id: "2",
        title: "Addition Facts",
        content: "1 + 1 = 2, 1 + 2 = 3, 1 + 3 = 4, 2 + 1 = 3, 2 + 2 = 4, 2 + 3 = 5, 3 + 1 = 4, 3 + 2 = 5, 3 + 3 = 6",
        color: "#7D5E5E",
      },
      {
        id: "3",
        title: "Geometric Shapes",
        content: "Circle, square, triangle, rectangle, hexagon, octagon",
        color: "#5E5E7D",
      },
    ],
  },
  {
    name: "Science",
    subjectId: "3",
    flashCards: [
      {
        id: "1",
        title: "Parts of a Plant",
        content: "Roots, stem, leaves, flower, fruit, seed.",
        color: "#734C7D",
      },
      {
        id: "2",
        title: "Solar System",
        content: "Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto.",
        color: "#5E5E7D",
      },
    ],
  },
]

const FlashCards: NextPage = () => {
  const [subjects, setSubjects] = useState(Dummy_subjects)
  const [selectedSubject, setSelectedSubject] = useState(Dummy_subjects[0])

  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>SchoolUtils: Flash Cards</title>
        <meta name="description" content="Zenithereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {sessionData ? <Header /> : <></>}

      <Box sx={{
        minHeight: "calc(100vh - 79px)"
      }}>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          minHeight: "calc(100vh - 79px)",
        }}>
          <FlashCardMenu subjects={subjects} _setSelectedSubject={setSelectedSubject} selectedSubject={selectedSubject}/>
          <FlashCardList flashCardList={selectedSubject?.flashCards}/>
        </Box>
      </Box>
    </>
  );
};

export default FlashCards;