import { connectAuthEmulator, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import 'isomorphic-fetch';
import { auth, db } from '../services/firebase';

describe("User", () => {   
  beforeAll(async () => {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  });

  const email1 = "pervious@gmail.com";
  const password1 = "pervioussenha";

  const email2 = "hacker@gmail.com";
  const password2 = "hackersenha";

  it("cannot access another user's account using UID", async () => {
    // Create two users
    const newUserCredential = await createUserWithEmailAndPassword(auth, email1, password1);
    const user = newUserCredential.user;

    await auth.signOut();
    const anotherUserCredential = await createUserWithEmailAndPassword(auth, email2, password2);
    const userHacker = anotherUserCredential.user;
    
    // Try to access the user account using uid, expect to fail
    const userDoc = doc(db, 'users', user?.uid);
    const userDocHacker = doc(db, 'users', userHacker?.uid);

    expect(getDoc(userDoc)).rejects.toThrow();
    expect(getDoc(userDocHacker)).rejects.not.toThrow();
  });

});

