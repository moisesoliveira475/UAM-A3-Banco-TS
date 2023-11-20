import { Box, Button, HStack, Heading, IconButton, Stack, Text, VStack, useColorMode } from "@chakra-ui/react"
import { FiGithub, FiMenu, FiMoon, FiSun } from "react-icons/fi"

interface LeftSideBarProps {
    button: React.ReactNode
}

export const LeftSideBar = ({button}: LeftSideBarProps) => {
    return (
        <Box
            gridArea={'sideBar'}
            backgroundColor={'rgba(61, 122, 229, 0.10)'}
            paddingLeft={4}
            borderLeft={'1px solid #A4B4CB'}
            style={{
                float: 'left',
                height: '100vh', 
                width: '208px', 
                position: 'fixed', 
                top: 0, 
                left: 0,
            }}
        >
            <Stack spacing={'6'}>
            <Stack direction="row" align="center" paddingTop={'5'}>
             <IconButton aria-label="Menu" icon={<FiMenu />} />
             <Heading fontSize="md">UAM Bank</Heading>
             {button}
           </Stack>
           <Stack direction="row" align="center">
             <Button leftIcon={<FiGithub />} variant="link">
               <Text>Github</Text>
             </Button>
           </Stack>
           <Stack spacing="2">
             <Heading fontSize="sm">Análise</Heading>
             <VStack>
               <Button variant="ghost" colorScheme="gray">
                 <Text fontSize={'sm'}>Carteira</Text>
               </Button>
               <Button variant="ghost" colorScheme="gray">
                 <Text fontSize={'sm'}>Faturas</Text>
               </Button>
             </VStack>
           </Stack>
           <Stack spacing="2">
             <Heading fontSize="sm">Conta</Heading>
             <VStack>
               <Button variant="ghost" colorScheme="gray">
                 <Text fontSize={'sm'}>Configurações</Text>
               </Button>
               <Button variant="ghost" colorScheme="gray">
                 <Text fontSize={'sm'}>Ajuda</Text>
               </Button>
             </VStack>
           </Stack>
            </Stack>
        </Box>
    )
}
