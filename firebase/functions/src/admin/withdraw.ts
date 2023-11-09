import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { userInformations } from "../types/auth.types";

import { logger } from 'firebase-functions/v1';

const db = getFirestore();

interface WithdrawProps {
  value: number;
  userUid: string;
};

export async function _withdraw({value, userUid}: WithdrawProps): Promise<{resultType: 'success' | 'error', resultMessage: string}> {
  const userRef = db.collection("users").doc(userUid);
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    return {resultType: 'error', resultMessage: 'User not found'};
  }
  const user = userDoc.data() as userInformations;
  if (user === undefined) {
    return {resultType: 'error', resultMessage: 'No user data found'};
  }
  
  let verifyValue = Number(value.toString().replace(/[a-zA-Z+-]/g, ''));

  if (verifyValue <= 0) {
    return {resultType: 'error', resultMessage: 'Invalid value'};
  }

  if(user.balance < verifyValue) {
    return {resultType: 'error', resultMessage: `Insufficient funds`};
  }
  const newBalance = user.balance - verifyValue;
  const totalWithdraws = user.totalWithdraws + verifyValue;
  const historicOfMovements = [{value: verifyValue, date: Timestamp.now(), type: 'withdraw'}, ...user.historicOfMovements];
  const historicOfBalance = [...user.historicOfBalance, {value: newBalance, date: Timestamp.now()}];
  try {
    await userRef.update({balance: newBalance, totalWithdraws, historicOfMovements: historicOfMovements, historicOfBalance: historicOfBalance});
    return {resultType: 'success', resultMessage: 'Withdraw successful'};
  } catch (error: any){
    logger.debug(error);
    return {resultType: 'error', resultMessage: 'Withdraw failed'};
  }
}
