import { Box, Text, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/useAuth";


export function CardInfo() {
    const { handleSignOut, userInformations, user } = useContext(AuthContext);

    return (
        <Box backgroundColor='white' padding={8} minHeight='120px' borderRadius='25px'>
            <Text fontSize='2xl' fontWeight='bold'>
                {user?.email}
            </Text>
            <Text fontSize='xl'>{userInformations?.account}</Text>
            <Text fontSize='xl'>{userInformations?.balance}</Text>
            <Text fontSize='xl'>{userInformations?.agency}</Text>
            <Text fontSize='xl'>{userInformations?.username}</Text>
            <Text fontSize='xl'>{userInformations?.createdAt.toDate().toLocaleDateString('pt-br', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'})}</Text>
            <Button onClick={handleSignOut}> SAIR </Button>
        </Box>
    )
}

export default CardInfo