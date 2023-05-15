import { type NextPage } from "next";
import Head from "next/head";
import { Box, Flex } from "@mantine/core";
import { Header } from "../layouts";
import { CalendarMain } from "../features/dashboard/CalendarMain";
import { useSession } from "next-auth/react";
import { LoginBox } from "../features/auth/LoginBox";

const Home: NextPage = () => {

  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>SchoolUtils</title>
        <meta name="description" content="Zenithereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {sessionData ? <Header /> : <></>}

      <Box>
        {
          sessionData ? <CalendarMain /> : 
          <Flex sx={{width: "100vw", height: "100vh"}} direction="column" justify={"center"} align={"center"}>
            <LoginBox />
          </Flex>
        }
      </Box>

      {/* <Footer /> */}
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div>
//       <p>
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <Button
//         onClick={
//           sessionData ? () => void signOut() : () => void signIn("google")
//         }
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </Button>
//     </div>
//   );
// };
