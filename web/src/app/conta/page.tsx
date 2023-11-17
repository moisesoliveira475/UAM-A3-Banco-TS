import { Box, Text, Button } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/useAuth";


export function Home() {
  const { handleSignOut } = useContext(AuthContext);
  
  return (
    <Box backgroundColor='white' padding={8} minHeight='120px' borderRadius='25px'>
      <Button onClick={handleSignOut}>Sair</Button>      
    </Box>
  )
}