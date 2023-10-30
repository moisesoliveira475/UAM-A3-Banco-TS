import { userInformations } from "@/types/auth.types";

interface getTransactionsInPeriodProps {
  transactions: {
    value: number;
    sender?: string, // user uid
    destination?: string, // user uid
    date: Date,
    type: 'transfer@sent' | 'transfer@received' | 'deposit' | 'withdraw' | 'credit@payment' | 'credit@loan';
  }[];
  startDate: Date;
  endDate: Date;
}

export function getTransactionsInPeriod({ transactions, startDate, endDate }: getTransactionsInPeriodProps) {
  // Implementação da função
  return transactions.filter(transaction => transaction.date >= startDate && transaction.date <= endDate);
}
