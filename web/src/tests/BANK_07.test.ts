import 'isomorphic-fetch';
import { calcDynamicCredit } from '../utils/calcDynamicCredit';
import { connectAuthEmulator, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { userInformations } from '../types/auth.types';

const email = "pervious@gmail.com";
const password = "senhadificil";

describe('Test validate credit', () => {
  beforeAll(async () => {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    await auth.signOut();
  });

  it('Must calculate credit correctly', async () => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    expect(user).not.toBeNull();

    const docRef = doc(db, 'users', user?.uid);
    const docSnap = (await getDoc(docRef)).data() as userInformations;

    const createdAt = docSnap.createdAt.toDate();
    const balance = docSnap.balance;

    // Calcula o crédito usando a função principal
    const calculatedCredit = calcDynamicCredit(createdAt, balance);

    // Confirma se o crédito foi calculado corretamente
    expect(calculatedCredit).not.toEqual(0);
  });
});