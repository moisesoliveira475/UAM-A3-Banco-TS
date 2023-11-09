import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { userInformations } from "../types/auth.types";

import { logger } from 'firebase-functions/v1';

const db = getFirestore();

interface TransferProps {
  value: number;
  userUid: string;
  account: number;
  agency: number;
};

export async function _transfer({value, userUid, account, agency}: TransferProps): Promise<{resultType: 'success' | 'error', resultMessage: string}> {
  const userSenderRef = db.collection("users").doc(userUid);
  const userDestinyRef = db.collection("users").where('account', '==', account).where('agency', '==', agency);

  const userSenderDoc = await userSenderRef.get();
  const userDestinyDoc = await userDestinyRef.get();
  if (!userSenderDoc.exists || userDestinyDoc.empty) {
    return {resultType: 'error', resultMessage: 'User or destiny not found'};
  }

  const userSender = userSenderDoc.data() as userInformations;
  const userDestiny = userDestinyDoc.docs[0].data() as userInformations;
  if (userSender === undefined || userDestiny === undefined) {
    return {resultType: 'error', resultMessage: `No user's data found`};
  }

  let verifyValue = Number(value.toString().replace(/[a-zA-Z+-]/g, ''));

  if (verifyValue <= 0) {
    return {resultType: 'error', resultMessage: 'Invalid value'};
  }

  if(userSender.balance < verifyValue) {
    return {resultType: 'error', resultMessage: `Insufficient funds`};
  }
  try {
    await userSenderRef.update({
      balance: userSender.balance - verifyValue, totalTransfers: userSender.totalTransfers + verifyValue, 
      historicOfMovements: [{value: verifyValue, date: Timestamp.now(), type: 'transfer@sent', sender: userSenderDoc.id, destination: userDestinyDoc.docs[0].ref.id}, ...userSender.historicOfMovements],
      historicOfBalance: [...userSender.historicOfBalance, {value: userSender.balance - verifyValue, date: Timestamp.now()}]
    });
    await userDestinyDoc.docs[0].ref.update({
      balance: userDestiny.balance + verifyValue, 
      historicOfMovements: [{value: verifyValue, date: Timestamp.now(), type: 'transfer@received', sender: userSenderDoc.id, destination: userDestinyDoc.docs[0].ref.id}, ...userDestiny.historicOfMovements],
      historicOfBalance: [...userDestiny.historicOfBalance, {value: userDestiny.balance + verifyValue, date: Timestamp.now()}]
    });
    return {resultType: 'success', resultMessage: 'Transfer successful'};
  } catch (error: any){
    logger.debug(error);
    return {resultType: 'error', resultMessage: 'Transfer failed'};
  }
}
