"use client"

import { Box, Center, Heading, Input } from "@chakra-ui/react"
import { useRouter } from 'next/navigation';
import { LoginButton } from "./LoginButton"
import { useState } from "react"
import { login } from "@/services/login"

export const Card = () => {
    const [email, setEmail] = useState<string>('');

    const router = useRouter();

    async function handleLogin() {
        await login(email)
        .then(() => {
            router.push('/conta', { scroll: false });
        })
    }

    return (
        <Box backgroundColor='#FFFFFF' borderRadius='25px' padding='15px' margin={4} >
            <Center>
                <Heading paddingBottom={2} size={"md"}>Faça o login</Heading>
            </Center>
            <Input placeholder="email" marginBottom={1} value={email} onChange={(event) => { setEmail(event.target.value) }} />
            <Input placeholder="password" />
            <Center>
                <LoginButton onClick={handleLogin} />
            </Center>
        </Box>
    )
}