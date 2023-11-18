import { Box, Text } from "@chakra-ui/react"

export const LeftSideBar = () => {
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
            <Box color={'white'} fontSize={'24px'} fontWeight={'bold'} marginTop={'20px'}>
                <Text>Bank TS</Text>
            </Box>
            <Text color={'white'} fontSize={'18px'} marginTop={'20px'}>Account</Text>
            <Text color={'white'} fontSize={'18px'} marginTop={'20px'}>Invoices </Text>
            <Text color={'white'} fontSize={'18px'} marginTop={'20px'}>Settings</Text>
        </Box>
    )
}
