import 'isomorphic-fetch';
import { auth, db, functions } from '../services/firebase';
import { signInWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { userInformations } from '@/types/auth.types';
import { httpsCallable } from 'firebase/functions';

describe("Testes para o suporte", () => {   
  beforeAll(async () => {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    await auth.signOut();
  });

  it("Deve retornar mensagem de suporte do sistema", async () => {
    const userCredential = await signInWithEmailAndPassword(auth, "pervious@gmail.com", "senhadificil");
    const user = userCredential.user;
    expect(user).not.toBeNull();

    const docRef = doc(db, 'users', user?.uid);
    const docSnap = (await getDoc(docRef)).data() as userInformations;
    
    await httpsCallable(functions, 'requestChat')({userUid: user?.uid, message: 'qual o meu extrato?'} as {userUid: string, message: 'preciso de ajuda' | 'qual o meu saldo?' | 'qual o meu extrato?' | 'qual o meu extrato de movimentações?' | 'qual o número da minha conta?'})
    .then((response) => {
      const result = response.data as {resultType: 'success' | 'error', resultMessage: string};

      expect(result.resultMessage).toContain('Seu extrato é');
    })
    await httpsCallable(functions, 'requestChat')({userUid: user?.uid, message: 'qual o meu extrato de movimentações?'} as {userUid: string, message: 'preciso de ajuda' | 'qual o meu saldo?' | 'qual o meu extrato?' | 'qual o meu extrato de movimentações?' | 'qual o número da minha conta?'})
    .then((response) => {
      const result = response.data as {resultType: 'success' | 'error', resultMessage: string};

      expect(result.resultMessage).toContain('Seu extrato de movimentações é');
    })
    await httpsCallable(functions, 'requestChat')({userUid: user?.uid, message: 'qual o número da minha conta?'} as {userUid: string, message: 'preciso de ajuda' | 'qual o meu saldo?' | 'qual o meu extrato?' | 'qual o meu extrato de movimentações?' | 'qual o número da minha conta?'})
    .then((response) => {
      const result = response.data as {resultType: 'success' | 'error', resultMessage: string};

      expect(result.resultMessage).toContain('O número da sua conta é');
    })
    await httpsCallable(functions, 'requestChat')({userUid: user?.uid, message: 'qual o meu saldo?'} as {userUid: string, message: 'preciso de ajuda' | 'qual o meu saldo?' | 'qual o meu extrato?' | 'qual o meu extrato de movimentações?' | 'qual o número da minha conta?'})
    .then((response) => {
      const result = response.data as {resultType: 'success' | 'error', resultMessage: string};

      expect(result.resultMessage).toContain('Seu saldo é');
    })
    await httpsCallable(functions, 'requestChat')({userUid: user?.uid, message: 'preciso de ajuda'} as {userUid: string, message: 'preciso de ajuda' | 'qual o meu saldo?' | 'qual o meu extrato?' | 'qual o meu extrato de movimentações?' | 'qual o número da minha conta?'})
    .then((response) => {
      const result = response.data as {resultType: 'success' | 'error', resultMessage: string};

      expect(result.resultMessage).toContain('Para um suporte mais rápido');
    })
  });
});