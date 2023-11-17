import 'isomorphic-fetch';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";

describe("Testing System Auth", () => {   
  beforeAll(async () => {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    await auth.signOut();
  });

  const email = "pervious@gmail.com";
  const password = "senhadificil";

  it("can register", async () => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    expect(user).not.toBeNull();
    expect(user?.email).toEqual(email);
  });

  it("can login and get last access time", async () => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    expect(user).not.toBeNull();
    expect(user?.email).toEqual(email);
    expect(user?.metadata.lastSignInTime).not.toBeNull();
  });

  it("can logout and delete session", async () => {
    await signInWithEmailAndPassword(auth, email, password);
    await auth.signOut();
    const user = auth.currentUser;
    expect(user).toBeNull();
  });
});