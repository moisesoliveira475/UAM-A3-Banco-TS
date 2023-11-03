import React from "react";
import { formatReal } from "@/utils/formatReal";
import { Box, Text } from "@chakra-ui/react";

import Image from "next/image";

interface SimpleBalanceCardProps {
  balance: number;
  text?: string;
  textColor?: string;
  style?: React.CSSProperties;
}

export function SimpleBalanceCard({ text, balance, textColor, style }: SimpleBalanceCardProps) {
  return (
    <Box
      style={{
        width: "100%",
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: "0.1rem",
        padding: "0.3rem 0.5rem",
        borderColor: "#FFFFFF80",
        borderRadius: "0.6rem",
        ...style
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Image
          src={require("@/assets/mastercard.png")}
          alt="Mastercard"
          width={20}
          height={20}
        />
        <Text
          style={{
            fontSize: "0.8rem",
            marginLeft: "0.3rem",
            fontWeight: "500",
          }}
        >
          {text || 'Saldo'}
        </Text>
      </Box>
      <Text style={{ fontSize: "0.8rem", fontWeight: "bold", color: textColor || "white", }}>
        {formatReal(balance || 0)}
      </Text>
    </Box>
  );
}
