import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { userInformations } from "../types/auth.types";

import { logger } from 'firebase-functions/v1';

const db = getFirestore();

interface LoanProps {
  value: number;
  userUid: string;
};

export async function _handleLoanRequested({value, userUid}: LoanProps): Promise<{resultType: 'success' | 'error', resultMessage: string}> {
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

  if(user.creditCard.availableCredit < verifyValue) {
    return {resultType: 'error', resultMessage: 'Insufficient credit'};
  }

  const newBalance = user.balance + verifyValue;
  const creditCard = {
    ...user.creditCard,
    availableCredit: user.creditCard.availableCredit - verifyValue,
    debt: user.creditCard.debt + verifyValue,
  };
  const historicOfMovements = [{
    value: verifyValue,
    date: Timestamp.now(),
    type: 'credit@loan',
  }, ...user.historicOfMovements];
  const historicOfBalance = [...user.historicOfBalance, {value: newBalance, date: Timestamp.now()}];

  try {
    await userRef.update({balance: newBalance, creditCard: creditCard, historicOfMovements: historicOfMovements, historicOfBalance: historicOfBalance});
    return {resultType: 'success', resultMessage: 'Loan successfully requested'};
  } catch (error: any){
    logger.debug(error);
    return {resultType: 'error', resultMessage: 'Error requesting loan'};
  }
}
