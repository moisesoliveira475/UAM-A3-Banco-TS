import { Timestamp } from "firebase/firestore";

export interface userInformations {
  username: string;
  agency: number;
  balance: number;
  account: number;
  createdAt: Timestamp;
  isActive: boolean;
};

