import 'isomorphic-fetch';
import { auth, db } from '../services/firebase';
import { signInWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { userInformations } from '@/types/auth.types';

describe("Testes para getAllTransactions", () => {   
  beforeAll(async () => {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    await auth.signOut();
  });

  it("Deve retornar todas as transações desde a criação da conta", async () => {
    const userCredential = await signInWithEmailAndPassword(auth, "pervious@gmail.com", "senhadificil");
    const user = userCredential.user;
    expect(user).not.toBeNull();

    const docRef = doc(db, 'users', user?.uid);
    const docSnap = (await getDoc(docRef)).data() as userInformations;
    
    expect(docSnap).toHaveProperty('totalDeposits');
    expect(docSnap).toHaveProperty('totalWithdraws');
    expect(docSnap).toHaveProperty('totalTransfers');
    expect(docSnap).toHaveProperty('historicOfMovements');
    expect(docSnap).toHaveProperty('historicOfBalance');
  });
});