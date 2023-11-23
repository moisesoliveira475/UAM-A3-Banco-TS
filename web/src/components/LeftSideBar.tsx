import { Box, Button, Heading, IconButton, Link, Stack, Text, VStack } from "@chakra-ui/react"
import { FiGithub, FiMenu } from "react-icons/fi"

interface LeftSideBarProps {
  button: React.ReactNode
}

export const LeftSideBar = ({ button }: LeftSideBarProps) => {
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
          <Heading fontSize="lg">UAM Bank</Heading>
          {button}
        </Stack>
        <Stack direction="row" align="center">
          <Button leftIcon={<FiGithub />} variant="link">
            <Link _hover={
              {
                textDecoration: 'none',
                color: 'blue.500'
              }
            } isExternal href="https://github.com/moisesoliveira475/UAM-A3-Banco-TS">Github</Link>
          </Button>
        </Stack>
        <Stack spacing="2">
          <Heading fontSize="lg">Análise</Heading>
          <VStack>
            <Button variant="ghost" colorScheme="gray">
              <Text fontSize={'lg'}>Carteira</Text>
            </Button>
            <Button variant="ghost" colorScheme="gray">
              <Text fontSize={'lg'}>Faturas</Text>
            </Button>
          </VStack>
        </Stack>
        <Stack spacing="2">
          <Heading fontSize="lg">Conta</Heading>
          <VStack>
            <Button variant="ghost" colorScheme="gray">
              <Text fontSize={'lg'}>Configurações</Text>
            </Button>
            <Button variant="ghost" colorScheme="gray">
              <Text fontSize={'lg'}>Ajuda</Text>
            </Button>
          </VStack>
        </Stack>
      </Stack>
    </Box>
  )
}
