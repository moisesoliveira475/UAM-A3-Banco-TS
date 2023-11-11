import { Box, Text } from "@chakra-ui/react"

interface ICardInfo {
    MainContent: string
    Content: string
}
    const CardInfo = ( {MainContent, Content}: ICardInfo) => {
    return (
        <Box backgroundColor='white' padding={8} minHeight='120px' borderRadius='25px'>
            <Text fontSize='2xl' fontWeight='bold'>
                {MainContent}
            </Text>
            <Text fontSize='xl'>
                {Content}
            </Text>
        </Box>
    )
}

export default CardInfo