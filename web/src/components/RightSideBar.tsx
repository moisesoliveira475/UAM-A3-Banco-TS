import {
  Box,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { FiBell, FiSearch } from "react-icons/fi";
import { CreditCard } from "./CreditCard";
import QuickTransfer from "./QuickActions";
import UserInformations from "./UserInformations";
import { FaCircleUser } from "react-icons/fa6";

interface RightSideBarProps {
  button: React.ReactNode;
}

export const RightSideBar = ({ button }: RightSideBarProps) => {

  return (
    <Box
      gridArea={"sideBar"}
      backgroundColor={"rgba(61, 122, 229, 0.10)"}
      paddingRight={4}
      borderRight={"1px solid #A4B4CB"}
      style={{
        width: "20rem",
        top: 0,
        right: 0,
        height: "100vh",
        padding: "2rem 1rem",
      }}
    >
      <Box
        style={{
          width: "100%",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.10)",
            borderRadius: "0.6rem",
            padding: "0 0.5rem",
            margin: "0",
            height: "2rem",
          }}
        >
          <FiSearch
            style={{
              color: "white",
              width: "1rem",
              height: "1rem",
              marginRight: "0.3rem",
              margin: "0.4rem 0.5rem 0.4rem 0",
            }}
          />
          <input
            placeholder="Procurar"
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              fontSize: "0.8rem",
              maxWidth: "10rem",
              outline: "none",
            }}
          />
        </Box>
        <FiBell
          style={{
            marginLeft: "1rem",
            color: "white",
            width: "1.3rem",
            height: "1.3rem",
          }}
        />
        {/* <Image
          alt="perfil"
          src={require("@/assets/erik.jpg")}
          width={25}
          height={25}
          style={{ borderRadius: "10rem", marginLeft: "0.8rem" }}
        /> */}
        <FaCircleUser
          style={{
            marginLeft: "1rem",
            color: "white",
            width: "1.5rem",
            height: "1.5rem",
          }}
        />
      </Box>
      <Box
        style={{
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop: "2rem",
        }}
      >
        <Text
          style={{ fontSize: "1.2rem", color: "white", marginBottom: "0.5rem" }}
        >
          Informações Pessoais
        </Text>
        <UserInformations />
      </Box>
      <Box
        style={{
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop: "2rem",
        }}
      >
        <Text
          style={{ fontSize: "1.2rem", color: "white", marginBottom: "0.5rem" }}
        >
          Crédito
        </Text>
        <CreditCard />
      </Box>
      <Box
        style={{
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop: "2rem",
        }}
      >
        <Text
          style={{ fontSize: "1.2rem", color: "white", marginBottom: "0.5rem" }}
        >
          Ações Rápidas
        </Text>
        <QuickTransfer />
      </Box>
      
      <Box style={{ position: "absolute", bottom: "20px", right: "20px" }}>
        {button}
      </Box>
    </Box>
  );
};
