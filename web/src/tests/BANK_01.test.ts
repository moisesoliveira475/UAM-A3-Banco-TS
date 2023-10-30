import 'isomorphic-fetch';
import { connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Timestamp, connectFirestoreEmulator, doc, setDoc } from 'firebase/firestore';
import { connectFunctionsEmulator } from 'firebase/functions';
import { auth, db, functions } from '../services/firebase';
import { userInformations } from '../types/auth.types';
import { randomKey } from '../utils/randomKey';
import { calcDynamicCredit } from '../utils/calcDynamicCredit';

describe("Create account", () => {   
  beforeAll(async () => {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    connectFunctionsEmulator(functions, "127.0.0.1", 5001);
    await auth.signOut();
  });

  const username = "pervious";
  const email = "pervious@gmail.com";
  const password = "senhadificil";

  it("can register", async () => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    expect(user).not.toBeNull();
    
    const userData = {
      username,
      agency: Number(randomKey(2)),
      account: Number(randomKey(6)),
      balance: 0,
      createdAt: Timestamp.now(),
      isActive: true,
      totalDeposits: 0,
      totalWithdraws: 0,
      totalTransfers: 0,
      creditCard: {
        number: Number(randomKey(16)),
        cvv: Number(randomKey(3)),
        expirationDate: `${randomKey(2)}/32`,
        availableCredit: calcDynamicCredit(new Date(), 0),
        totalCredit: calcDynamicCredit(new Date(), 0),
        debt: 0,
      },
      historicOfMovements: [],
      historicOfBalance: [{date: Timestamp.now(), value: 0}],
      lastLogin: Timestamp.now(),
    } as userInformations;

    const docRef = doc(db, 'users', user?.uid); 
    await setDoc(docRef, userData);
  });

  it("can logout and delete session", async () => {
    await signInWithEmailAndPassword(auth, email, password);
    await auth.signOut();
    const user = auth.currentUser;
    expect(user).toBeNull();
  });
});