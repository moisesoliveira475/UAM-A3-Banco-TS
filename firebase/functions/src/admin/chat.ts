import { getFirestore } from "firebase-admin/firestore";
import { userInformations } from "../types/auth.types";

import { logger } from 'firebase-functions/v1';

const db = getFirestore();

interface ChatProps {
  message: 'preciso de ajuda' | 'qual o meu saldo?' | 'qual o meu extrato?' | 'qual o meu extrato de movimentações?' | 'qual o número da minha conta?' | string;
  userUid: string;
};

export async function _chat({message, userUid}: ChatProps): Promise<{resultType: 'success' | 'error', resultMessage: string}> {
  const userRef = db.collection("users").doc(userUid);
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    return {resultType: 'error', resultMessage: 'User not found'};
  }
  const user = userDoc.data() as userInformations;
  if (user === undefined) {
    return {resultType: 'error', resultMessage: 'No user data found'};
  }
  logger.debug(message);
  try {
    switch (message) {
      case "preciso de ajuda":
        return {resultType: 'success', resultMessage: 'Para um suporte mais rápido, faça contato direto com o suporte: (11) 99999-9999'};
      case "qual o meu saldo?":
        return {resultType: 'success', resultMessage: 'Seu saldo é: ' + user.balance};
      case "qual o meu extrato?":
        return {resultType: 'success', resultMessage: 'Seu extrato é: ' + user.historicOfBalance};
      case "qual o meu extrato de movimentações?":
        return {resultType: 'success', resultMessage: 'Seu extrato de movimentações é: ' + user.historicOfMovements};
      case "qual o número da minha conta?":
        return {resultType: 'success', resultMessage: 'O número da sua conta é: ' + user.account + ' e o número da sua agência é: ' + user.agency};
      default:
        return {resultType: 'success', resultMessage: 'Não compreendi sua mensagem, entre em contato com o suporte para mais informações: (11) 99999-9999'};
    }
  } catch (error: any){
    logger.debug(error);
    return {resultType: 'error', resultMessage: 'Unexpected error, please try again later'};
  }
}
