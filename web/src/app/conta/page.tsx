import { LeftSideBar } from "@/components/LeftSideBar";
import { RightSideBar } from "@/components/RightSideBar";
import { AuthContext } from "@/contexts/useAuth";
import { Box, Button } from "@chakra-ui/react";
import { useContext } from "react";


export function Home() {
  const { handleSignOut } = useContext(AuthContext);
  
  return (
    <>
      <LeftSideBar />
      <RightSideBar button={<Button onClick={handleSignOut}>Sair</Button>} />
    </>
  )
}
