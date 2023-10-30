import 'isomorphic-fetch';
import { connectAuthEmulator, signInWithEmailAndPassword } from "firebase/auth";
import { httpsCallable } from 'firebase/functions';
import { auth, functions } from '../services/firebase';

describe("Testing deposit", () => {   
  beforeAll(async () => {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    await auth.signOut();
  });

  const email = "pervious@gmail.com";
  const password = "senhadificil";

  it("login and deposit", async () => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    expect(user).not.toBeNull();

    await httpsCallable(functions, 'handleDeposit')({value: 1000, userUid: user?.uid})
    .then((response) => {
      const result = response.data as {resultType: 'success' | 'error', resultMessage: string};
      if(result.resultType === 'success') {
        expect(result.resultMessage).toEqual('Deposit successful');
      } 
    })
  });
});