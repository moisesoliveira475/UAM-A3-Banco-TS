"use client";

import { Box, Button, Center, Input, Text } from "@chakra-ui/react";
import Image from 'next/image';
import { useContext, useState } from "react";

import { LoginButton } from "@/components/LoginButton";

import { AuthContext } from "@/contexts/useAuth";
import { colors } from "@/styles";

export const Auth = () => {
  const { handleCreateUser, handleSignIn } = useContext(AuthContext);
  const [authType, setAuthType] = useState<"LOGIN" | "REGISTER">("LOGIN");

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleAction() {
    if (authType === "LOGIN") {
      handleSignIn(email, password);
    } else {
      handleCreateUser(username, email, password);
    }
  }

  function handleChangeType() {
    if (authType === "LOGIN") {
      setAuthType("REGISTER");
    } else {
      setAuthType("LOGIN");
    }
  }

  return (
    <Box
      display="flex" alignItems="center" justifyContent="center"
      width="100vw" height="100vh"
    >
      <Image 
        src={require('@/assets/logo.svg')} alt="Logo" 
        style={{ position: 'absolute', top: '0', left: '0', width: '100vw', height: '100vh', opacity: '0.1', objectFit: 'cover' }}
      />
      <Box
        backgroundColor={colors.BLUE_SECONDARY}
        borderRadius="25px"
        padding="5rem 2rem"
        margin={4}
        boxShadow="0px 0px 10px 0px rgba(0,0,0,0.75)"
      >
        <Text
          textAlign={"center"} fontSize="1.7rem" fontWeight="bold"
          fontFamily={"Arial"} color={colors.BLACK_PRIMARY}
          marginBottom={"1rem"}
        >
          FAÇA O LOGIN
        </Text>
        {authType === "REGISTER" && (
          <Input
            backgroundColor={colors.BLACK_PRIMARY}
            placeholder="username"
            marginBottom={1}
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        )}
        <Input
          backgroundColor={colors.BLACK_PRIMARY}
          placeholder="email"
          marginBottom={1}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <Input
          backgroundColor={colors.BLACK_PRIMARY}
          placeholder="password"
          marginBottom={1}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Center>
          <LoginButton
            onClick={() => {
              handleAction();
            }}
            text={authType === "LOGIN" ? "ENTRAR" : "REGISTRAR"}
          />
        </Center>
        <Box display="flex" width={"100%"} marginTop={"1rem"} alignItems={"center"} justifyContent={"center"}>
          <Button onClick={handleChangeType}> 
            {authType === "LOGIN"
              ? "Não tem uma conta? Crie uma aqui!"
              : "Já tem uma conta? Faça o login aqui!"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
