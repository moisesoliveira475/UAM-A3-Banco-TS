import { Timestamp } from "firebase/firestore";
import { Timestamp as TimeStampAdmin } from "firebase-admin/firestore";

export interface userInformations {
  username: string;
  agency: number;
  balance: number;
  creditCard: {
    number: number;
    cvv: number;
    expirationDate: string;
    availableCredit: number;
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
    sender?: string,
    destination?: string,
    date: Timestamp | TimeStampAdmin,
    type: 'transfer@sent' | 'transfer@received' | 'deposit' | 'withdraw' | 'credit@payment' | 'credit@loan';
  }[];
};

