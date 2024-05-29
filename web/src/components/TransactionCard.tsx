import { convertDate } from "@/utils/convertDate";
import { formatReal } from "@/utils/formatReal";
import { Box, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import {
  FiArrowDown,
  FiArrowUp,
  FiCircle,
  FiCreditCard,
  FiTrendingDown,
  FiTrendingUp,
} from "react-icons/fi";

interface TransactionCardProps {
  data: {
    value: number;
    sender?: string; // user uid
    destination?: string; // user uid
    date: Timestamp;
    type:
      | "transfer@sent"
      | "transfer@received"
      | "deposit"
      | "withdraw"
      | "credit@payment"
      | "credit@loan";
  };
}

export function TransactionCard({ data }: TransactionCardProps) {
  console.log(data)
  return (
    <Box
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Box
          style={{
            padding: "0.7rem",
            background: "#D3E1F530",
            borderRadius: "0.3rem",
            marginRight: "0.7rem",
          }}
        >
          {(data.type === "transfer@sent" ||
            data.type === "transfer@received") && (
            <FaMoneyBillTransfer
              style={{ width: 18, height: 18, fill: "#42e2a1" }}
            />
          )}
          {data.type === "deposit" && (
            <FiArrowUp style={{ width: 18, height: 18, stroke: "#1192EF" }} />
          )}
          {data.type === "withdraw" && (
            <FiArrowDown style={{ width: 18, height: 18, stroke: "#e2a142" }} />
          )}
          {data.type === "credit@payment" ||
            (data.type === "credit@loan" && (
              <FiCreditCard
                style={{ width: 18, height: 18, stroke: "#e24242" }}
              />
            ))}
        </Box>
        <Box>
          <Text
            style={{
              fontSize: "0.9rem",
              lineHeight: "0.9rem",
              margin: "0.2rem 0",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {data.type === "deposit" ? "Depósito" : data.type === "withdraw" ? "Saque" : data.type === 'credit@loan' ? "Empréstimo de crédito" : data.type === 'credit@payment' ? 'Pagamento de crédito' : data.type === 'transfer@received' ? 'Transferência recebida' : data.type === 'transfer@sent' ? 'Transferência recebida' : 'Carregando...'}
          </Text>
          <Text
            style={{
              fontSize: "0.7rem",
              lineHeight: "0.7rem",
              margin: "0.2rem 0",
              color: "#5B5B5B",
              fontWeight: "500",
            }}
          >
            {convertDate({
              timeStampDate: data.date,
              options: "DATE_AND_HOURS",
            })}
          </Text>
        </Box>
      </Box>
      <Box
        style={{
          display: "flex",
          padding: "0.3rem",
          background: "#A7D6F9",
          alignItems: "center",
          borderRadius: "0.3rem",
          justifyContent: "center",
        }}
      >
        <FiCircle
          style={{ width: 10, height: 10, fill: "#1192EF", stroke: "none" }}
        />
        <Text
          style={{ color: "#1192EF", fontSize: "0.7rem", fontFamily: "Sora" }}
        >
          {data.type === "deposit" ? "Depósito" : data.type === "withdraw" ? "Saque" : data.type === 'credit@loan' ? "Empréstimo de crédito" : data.type === 'credit@payment' ? 'Pagamento de crédito' : data.type === 'transfer@received' ? 'Transferência recebida' : data.type === 'transfer@sent' ? 'Transferência recebida' : 'Carregando...'}
        </Text>
      </Box>
      <Box>
        {data.type === "credit@payment" ||
        data.type === "withdraw" ||
        data.type === "transfer@sent" ? (
          <FiTrendingDown
            style={{ width: 18, height: 18, stroke: "#1192EF" }}
          />
        ) : (
          <FiTrendingUp style={{ width: 18, height: 18, stroke: "#1192EF" }} />
        )}
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{ fontSize: "0.8rem", color: "#FAFBFC", fontWeight: "500" }}
        >
          {formatReal(data.value)}
        </Text>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "1rem",
            padding: "0.3rem 0.5rem",
            borderRadius: "0.5em",
            background: "linear-gradient(90deg, #3E79E5 0%, #01B8E3 100%)",
          }}
        >
          <Text
            style={{ color: "#FAFBFC", fontSize: "0.8rem", fontFamily: "Sora" }}
          >
            Ver fatura
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
