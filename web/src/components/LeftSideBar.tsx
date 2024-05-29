import {
  Box,
  Button,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiGithub, FiHelpCircle, FiMenu, FiSettings } from "react-icons/fi";
import NextLink from "next/link";
import Image from "next/image";
import { FaCircle, FaHome, FaSun } from "react-icons/fa";
import { FaFileInvoiceDollar, FaMoneyBillWheat } from "react-icons/fa6";


interface LeftSideBarProps {
  button: React.ReactNode;
}

export const LeftSideBar = ({ button }: LeftSideBarProps) => {

  function navigateToQuery(urlPath: string) {
    window.open(`${window.location.host}${urlPath}`);
  }

  // function to get url
  function useQuery() {
    return window.location.pathname;
  }

  function openUrl(url: string) {
    window.open(url, "_blank");
  }

  const iconsList = [
    {
      icon: <FaHome style={{ color: "white", width: "1.1rem", height: "1.1rem" }} />,
      text: "Início",
      query: "/",
      linkType: 'query'
    },
    {
      icon: <FaFileInvoiceDollar style={{ color: "white", width: "1.1rem", height: "1.1rem" }} />,
      text: "Faturas",
      query: undefined,
      linkType: 'query'
    },
    {
      icon: <FiSettings style={{ color: "white", width: "1.1rem", height: "1.1rem" }} />,
      text: "Configurações",
      query: undefined,
      linkType: 'query'
    },
    {
      icon: <FaSun style={{ color: "white", width: "1.1rem", height: "1.1rem" }} />,
      text: "Mudar tema",
      query: undefined,
      linkType: 'link'
    },
    {
      icon: <FiHelpCircle style={{ color: "white", width: "1.1rem", height: "1.1rem" }} />,
      text: "Ajuda",
      query: undefined,
      linkType: 'link'
    },
    {
      icon: <FiGithub style={{ color: "white", width: "1.1rem", height: "1.1rem" }} />,
      text: "Github",
      query: 'https://github.com/moisesoliveira475/UAM-A3-Banco-TS',
      linkType: 'link'
    }
  ] as {
    icon: JSX.Element;
    text: string;
    query: string;
    linkType?: 'query' | 'link'
  }[];

  return (
    <Box
      gridArea={"sideBar"}
      backgroundColor={"rgba(61, 122, 229, 0.10)"}
      paddingLeft={4}
      borderLeft={"1px solid #A4B4CB"}
      style={{
        float: "left",
        height: "100vh",
        width: "15rem",
        display: "flex",
        flexDirection: "column",
        top: 0,
        left: 0,
        padding: "2rem 0",
        alignItems: "center",
        color: 'white'
      }}
    >
      <Image
        src={require("@/assets/rayLogo.png")}
        alt="Logo"
        width={150}
        height={150}
      />
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "4rem",
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        {iconsList.map((icon, index) => (
          <Box
            key={index}
            style={{
              display: "flex",
              alignItems: 'center',
              width: '100%',
            }}
          >
            {icon.query == useQuery() && (
              <FaCircle
                style={{ 
                  color: 'transparent',
                  background: "linear-gradient(90deg, #3E79E5 0%, rgba(61,122,229,1) 35%, rgba(0,212,255,1) 100%)",
                  borderRadius: '10rem',
                  width: "1.5rem", height: "1.5rem",
                  marginLeft: '-1rem',
                  position: 'absolute',
                }}
              />
            )}
            <Button leftIcon={icon.icon} 
              onClick={() => {
                icon.linkType == 'link' && icon.query ?
                  openUrl(icon.query)
                : icon.linkType == 'query' && icon.query &&
                  navigateToQuery(icon.query)
              }}
              variant={useQuery() == icon.query ? "solid" : "ghost"} 
              colorScheme="gray"
              style={{
                margin: '0.4rem 2.2rem',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
              _hover={undefined}
            >
              <Text fontSize={"lg"} color="white">{icon.text}</Text>
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
