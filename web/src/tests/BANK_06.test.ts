import 'isomorphic-fetch';
import { userInformations } from '@/types/auth.types';
import { connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { auth, db, functions } from '../services/firebase';
import { randomKey } from '../utils/randomKey';
import { calcDynamicCredit } from '../utils/calcDynamicCredit';

async function createASecondUser() {
  const username = "moises";
  const email = "moises@gmail.com";
  const password = "senhamaisdificil";

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const docRef = doc(db, 'users', user?.uid); 
  await setDoc(docRef, {
    username,
    agency: 22,
    account: 221144,
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
  } as userInformations);
}

describe("Testing transfer", () => {   
  beforeAll(async () => {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    await createASecondUser();
    await auth.signOut();
  });

  const email = "pervious@gmail.com";
  const password = "senhadificil";

  it("login and transfer", async () => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    expect(user).not.toBeNull();

    const docRef = doc(db, 'users', user?.uid);
    const docSnap = (await getDoc(docRef)).data() as userInformations;
    const actualBalance = docSnap.balance;

    await httpsCallable(functions, 'handleTransfer')({value: (actualBalance + 1000), userUid: user?.uid, account: 221144, agency: 22})
    .then((response) => {
      const result = response.data as {resultType: 'success' | 'error', resultMessage: string};
      
      expect(result.resultMessage).toEqual('Insufficient funds');
    })
  });
});