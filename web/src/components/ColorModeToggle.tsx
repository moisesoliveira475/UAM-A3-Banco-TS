import { IconButton, useColorMode } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

export const ColorModeToggle = () => {
 const { colorMode, toggleColorMode } = useColorMode();
 return (
    <IconButton
      aria-label="Toggle Dark Mode"
      icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
      onClick={toggleColorMode}
    />
 );
};  