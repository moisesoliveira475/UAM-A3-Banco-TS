import { Box, Text } from "@chakra-ui/react";
import QuickTransfer from "./QuickTransfer";
import WalletComponent from "./Wallet";

interface RightSideBarProps {
    button: React.ReactNode;
}

export const RightSideBar = ({ button }: RightSideBarProps) => {
    return (
        <Box
            gridArea={'sideBar'}
            backgroundColor={'rgba(61, 122, 229, 0.10)'}
            paddingRight={4}
            borderRight={'1px solid #A4B4CB'}
            style={{
                width: '317px',
                position: 'fixed',
                top: 0, 
                right: 0,
                height: '100vh',
            }}
        >
                <Box color={"white"} fontSize={'24px'} fontWeight={'bold'} marginTop={'20px'}>
                    <Text textAlign="center">Wallet</Text>
                </Box>
                <WalletComponent />
                <QuickTransfer />
                <Box style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
                    {button}
                </Box>
        </Box>
    )
}
