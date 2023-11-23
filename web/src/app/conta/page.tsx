import { ColorModeToggle } from "@/components/ColorModeToggle";
import { LeftSideBar } from "@/components/LeftSideBar";
import { OverView } from "@/components/Overview";
import { RightSideBar } from "@/components/RightSideBar";
import { Transactions } from "@/components/Transactions";
import { AuthContext } from "@/contexts/useAuth";
import { Button } from "@chakra-ui/react";
import { useContext } from "react";


export function Home() {
  const { handleSignOut } = useContext(AuthContext);
  
  return (
    <>
      <LeftSideBar button={<ColorModeToggle />}/>
      <OverView />
      <Transactions />
      <RightSideBar button={<Button onClick={handleSignOut}>Sair</Button>} />
    </>
  )
}

