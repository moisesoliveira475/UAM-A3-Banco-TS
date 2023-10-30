import 'isomorphic-fetch';
import { userInformations } from '@/types/auth.types';
import { connectAuthEmulator, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { auth, db, functions } from '../services/firebase';

describe("Testing loan", () => {   
  beforeAll(async () => {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    await auth.signOut();
  });

  const email = "pervious@gmail.com";
  const password = "senhadificil";

  it("Login and take out a loan", async () => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    expect(user).not.toBeNull();

    const docRef = doc(db, 'users', user?.uid);
    const docSnap = (await getDoc(docRef)).data() as userInformations;
    const availableCredit = docSnap.creditCard.availableCredit;

    await httpsCallable(functions, 'handleLoanRequested')({value: (availableCredit + 1000), userUid: user?.uid})
    .then((response) => {
      const result = response.data as {resultType: 'success' | 'error', resultMessage: string};
      
      expect(result.resultMessage).toEqual('Insufficient credit');
    })
  });
});