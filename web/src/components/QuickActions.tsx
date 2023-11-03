import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { useContext, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

import { AuthContext } from "@/contexts/useAuth";

import { formatReal } from "@/utils/formatReal";
import { iconsList } from "@/utils/globalConsts";
import { SimpleBalanceCard } from "./SimpleBalanceCard";

const QuickTransfer = () => {
  const { userInformations } = useContext(AuthContext);

  const [valor, setValor] = useState(0);
  const [account, setAccount] = useState(0);
  const [agency, setAgency] = useState(0);
  const toast = useToast();

  const [activeOption, setActiveOption] = useState<
    "Depositar" | "Sacar" | "Enviar" | "Empréstimo"
  >("Depositar");

  const { handleDeposit, handleWithdraw, handleTransfer, handleLoanRequested } =
    useContext(AuthContext);

  function handleAction(text: string) {
    switch (text) {
      case "Depositar":
        if (valor <= 0) {
          toast({
            title: "Valor inválido",
            description: "O valor deve ser maior que 0",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          return;
        }
        handleDeposit(valor);
        break;
      case "Sacar":
        if (valor <= 0) {
          toast({
            title: "Valor inválido",
            description: "O valor deve ser maior que 0",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          return;
        }
        handleWithdraw(valor);
        break;
      case "Enviar":
        if (valor <= 0 || account <= 0 || agency <= 0) {
          toast({
            title: "Falta de informações",
            description: "Preencha todos os campos",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          return;
        }
        handleTransfer(valor, account, agency);
        break;
      case "Empréstimo":
        if (valor <= 0) {
          toast({
            title: "Valor inválido",
            description: "O valor deve ser maior que 0",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          return;
        }
        handleLoanRequested(valor);
        break;
      default:
        break;
    }
  }

  function handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, "");
    value = String(Number(value) / 100);
    setValor(Number(value));
  }

  return (
    <Box
      style={{
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.10)",
        borderRadius: "0.6rem",
        padding: "1rem",
      }}
    >
      {activeOption !== "Empréstimo" ? (
        <SimpleBalanceCard balance={userInformations!.balance} />
      ) : (
        <SimpleBalanceCard
          balance={userInformations!.creditCard.availableCredit}
        />
      )}
      {(activeOption === "Depositar" || activeOption === "Empréstimo") &&
        valor > 0 && (
          <SimpleBalanceCard
            balance={userInformations!.balance + valor}
            text="Saldo futuro"
            textColor="rgb(87, 230, 20)"
            style={{ marginTop: "0.5rem" }}
          />
        )}
      {activeOption === "Enviar" && (
        <Box
          style={{
            width: "100%",
            flexDirection: "column",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginTop: "1rem",
            borderWidth: "0.1rem",
            padding: "0.5rem 0.8rem",
            borderColor: "#FFFFFF50",
            borderRadius: "0.6rem",
            backgroundColor: "rgba(255, 255, 255, 0.10)",
          }}
        >
          <FormLabel style={{ fontSize: "0.7rem", margin: "0" }}>
            {"Digite a conta (6) + agência (2)"}
          </FormLabel>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <input
              type="number"
              value={account}
              onChange={(e) => setAccount(Number(e.target.value))}
              style={{
                border: "none",
                background: "none",
                color: "white",
                width: "100%",
                outline: "none",
                height: "2rem",
                padding: "0",
              }}
              placeholder="Conta"
            />
            <input
              type="number"
              value={agency}
              onChange={(e) => setAgency(Number(e.target.value))}
              style={{
                border: "none",
                background: "none",
                color: "white",
                width: "100%",
                outline: "none",
                height: "2rem",
                padding: "0",
              }}
              placeholder="Agência"
              maxLength={2}
              max={2}
            />
          </Box>
        </Box>
      )}
      <Box
        style={{
          width: "100%",
          flexDirection: "column",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginTop: "1rem",
          borderWidth: "0.1rem",
          padding: "0.5rem 0.8rem",
          borderColor: "#FFFFFF50",
          borderRadius: "0.6rem",
          backgroundColor: "rgba(255, 255, 255, 0.10)",
        }}
      >
        <FormLabel style={{ fontSize: "0.7rem", margin: "0" }}>
          Digite o valor
        </FormLabel>
        <input
          type="text"
          value={formatReal(valor)}
          onChange={handleChangeValue}
          style={{
            border: "none",
            background: "none",
            color:
              activeOption === "Sacar" || activeOption === "Enviar"
                ? userInformations!.balance < valor
                  ? "red"
                  : "white"
                : activeOption === "Empréstimo"
                ? userInformations!.creditCard.availableCredit < valor
                  ? "red"
                  : "white"
                : "white",
            width: "100%",
            outline: "none",
            height: "2rem",
            padding: "0",
          }}
          placeholder={formatReal(0)}
        />
      </Box>
      <Box style={{ width: "100%", marginTop: "0.5rem" }}>
        <Button
          onClick={() => handleAction(activeOption)}
          style={{
            width: "100%",
            background: "linear-gradient(90deg, #01B8E3 0%, #059cbe 100%)",
            border: "none",
            color: "white",
            fontSize: "0.7rem",
            height: "2rem",
            outline: "none",
            borderRadius: "0.6rem",
          }}
        >
          {activeOption === "Depositar"
            ? "Fazer depósito"
            : activeOption === "Sacar"
            ? "Fazer saque"
            : activeOption === "Enviar"
            ? "Transferir"
            : "Solicitar empréstimo"}
        </Button>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          width: "100%",
          marginTop: "2rem",
        }}
      >
        {iconsList.map((item, index) => (
          <button
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              margin: "0 0.5rem",
            }}
            onClick={() => setActiveOption(item.text)}
          >
            <Box
              style={{
                background: "linear-gradient(90deg, #3E79E5 0%, #01B8E3 100%)",
                borderRadius: "0.6rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2.3rem",
                height: "2.3rem",
                border:
                  activeOption === item.text ? "1.5px solid #FFF" : "none",
              }}
            >
              {item.icon}
            </Box>
            <Text
              style={{
                marginTop: "0.5rem",
                textAlign: "center",
                fontSize: "0.6rem",
                fontWeight: "500",
                color: activeOption === item.text ? "#FFF" : "#FFFFFF80",
                letterSpacing: "0.6px",
                textDecoration:
                  activeOption === item.text ? "underline" : "none",
              }}
            >
              {item.text}
            </Text>
          </button>
        ))}
      </Box>
    </Box>
  );
};

export default QuickTransfer;
