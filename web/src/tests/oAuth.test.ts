import 'isomorphic-fetch';
import firebaseApp, { auth } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";

describe("User", () => {   
  beforeAll(async () => {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  });

  const email = "opaan@example.com";
  const password = "testPassword";

  it("can register", async () => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    expect(user).not.toBeNull();
    expect(user?.email).toEqual(email);
  });

  it("can login", async () => {
    await auth.signOut();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    expect(user).not.toBeNull();
    expect(user?.email).toBe(email);
  });

  it("can logout", async () => {
    await auth.signOut();
    const user = auth.currentUser;
    expect(user).toBeNull();
  });
});