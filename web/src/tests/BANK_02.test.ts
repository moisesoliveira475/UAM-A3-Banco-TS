import 'isomorphic-fetch';
import { connectAuthEmulator, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../services/firebase';

describe("Testing System Auth", () => {   
  beforeAll(async () => {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    await auth.signOut();
  });

  const email = "pervious@gmail.com";
  const password = "senhadificil";

  it("can login and get last access time", async () => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    expect(user).not.toBeNull();
    expect(user?.email).toEqual(email);
    expect(user?.metadata.lastSignInTime).not.toBeNull();
  });
});