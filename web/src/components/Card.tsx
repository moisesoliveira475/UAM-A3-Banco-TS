"use client"

import { useContext, useState } from 'react';
import { Box, Center, Heading, Input, Link } from "@chakra-ui/react";

import { LoginButton } from "./LoginButton";

import { AuthContext } from "@/contexts/useAuth";

export const LoginCard = () => {
    const { handleCreateUser, handleSignIn } = useContext(AuthContext);
    const [authType, setAuthType] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function handleAction() {
        if (authType === 'LOGIN') {
            handleSignIn(email, password)
        } else {
            handleCreateUser(username, email, password)
        }
    }

    function handleChangeType() {
        if (authType === 'LOGIN') {
            setAuthType('REGISTER');
        } else {
            setAuthType('LOGIN');
        }
    }

    return (
        <Box backgroundColor='#FFFFFF' borderRadius='25px' padding='15px' margin={4} >
            <Center>
                <Heading paddingBottom={2} size={"md"}>Faça o login</Heading>
            </Center>
            {authType === 'REGISTER' && (
                <Input placeholder="username" marginBottom={1} value={username} onChange={(event) => { setUsername(event.target.value) }} />
            )}
            <Input placeholder="email" marginBottom={1} value={email} onChange={(event) => { setEmail(event.target.value) }} />
            <Input placeholder="password" marginBottom={1} value={password} onChange={(event) => { setPassword(event.target.value) }} />
            <Center>
                <LoginButton onClick={() => { handleAction() }} text={authType === 'LOGIN' ? 'ENTRAR' : 'REGISTRAR'} />
            </Center>
            <Link onClick={handleChangeType} >{authType === 'LOGIN' ? 'Não tem uma conta? Crie uma aqui!' : 'Já tem uma conta? Faça o login aqui!'}</Link>
        </Box>
    )
}