import { ColorModeToggle } from "@/components/ColorModeToggle";
import { LeftSideBar } from "@/components/LeftSideBar";
import { OverView } from "@/components/Overview";
import { RightSideBar } from "@/components/RightSideBar";
import { AuthContext } from "@/contexts/useAuth";
import { db } from "@/services/firebase";
import { userInformations } from "@/types/auth.types";
import { Box, Button } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect } from "react";


export function Home() {
  const { handleSignOut, user, userInformations, handleGetUserInformations } = useContext(AuthContext);
  
  useEffect(() => {
    async function getLastBalance() {      
      if(!user) return;

      const docRef = doc(db, 'users', user!.uid);
      await getDoc(docRef)
      .then((response) => {
        if (response.exists()) {
          let data = response.data() as userInformations;
          data.balance !== userInformations?.balance && handleGetUserInformations();
        }
      })
    }

    const interval = setInterval(() => {
      getLastBalance();
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: "100vw",
        height: "100vh",
        alignItems: "stretch",
        justifyContent: "space-between",
        color: 'white'
      }}
    >
      <LeftSideBar button={<ColorModeToggle />}/>
      <OverView />
      {/* <Transactions /> */}
      <RightSideBar button={<Button onClick={handleSignOut}>Sair</Button>} />
    </Box>
  )
}

