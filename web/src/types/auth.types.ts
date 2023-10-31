import { Timestamp } from "firebase/firestore";

export interface userInformations {
  username: string;
  agency: number;
  balance: number;
  creditCard: {
    number: number;
    cvv: number;
    expirationDate: string;
    availableCredit: number;
    totalCredit: number;
    debt: number; 
  };
  account: number;
  createdAt: Timestamp;
  isActive: boolean;
  totalWithdraws: number;
  totalDeposits: number;
  totalTransfers: number;
  historicOfBalance: {
    value: number;
    date: Timestamp;
  }[];
  historicOfMovements: {
    value: number;
    sender?: string, // user uid
    destination?: string, // user uid
    date: Timestamp,
    type: 'transfer@sent' | 'transfer@received' | 'deposit' | 'withdraw' | 'credit@payment' | 'credit@loan';
  }[];
  lastLogin: Timestamp;
};

