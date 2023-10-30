import { FaFolderPlus, FaMoneyBill } from "react-icons/fa";
import {
  FaMoneyBillTransfer,
  FaMoneyBillWheat,
  FaFileInvoiceDollar,
} from "react-icons/fa6";

export const iconsList = [
  {
    icon: (
      <FaMoneyBill
        style={{ color: "white", width: "1.1rem", height: "1.1rem" }}
      />
    ),
    text: "Depositar",
  },
  {
    icon: (
      <FaMoneyBillWheat
        style={{ color: "white", width: "1.1rem", height: "1.1rem" }}
      />
    ),
    text: "Sacar",
  },
  {
    icon: (
      <FaMoneyBillTransfer
        style={{ color: "white", width: "1.1rem", height: "1.1rem" }}
      />
    ),
    text: "Enviar",
  },
  {
    icon: (
      <FaFileInvoiceDollar
        style={{ color: "white", width: "1.1rem", height: "1.1rem" }}
      />
    ),
    text: "Empréstimo",
  },
] as {
  icon: JSX.Element;
  text: "Depositar" | "Sacar" | "Enviar" | "Empréstimo";
}[];
