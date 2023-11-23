import { AuthContext } from "@/contexts/useAuth";
import { useContext } from "react";
import { Card, CardHeader, CardBody, Heading, Stack, Box, Text, StackDivider, Center } from '@chakra-ui/react'

export function OverView() {

    const { userInformations } = useContext(AuthContext);

    return (
        <Center>
            <Card margin={10} width={700}>
                <CardHeader>
                    <Heading size='md'>Overview</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Summary
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                View a summary of all your movements over the last month.
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Overview
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                Check out the overview of your debits.
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Analysis
                            </Heading>
                            <Text>
                                See a detailed analysis of all your finance.
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </Center>
    )
}