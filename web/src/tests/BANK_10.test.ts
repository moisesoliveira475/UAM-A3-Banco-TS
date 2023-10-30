import { connectAuthEmulator, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import 'isomorphic-fetch';
import { auth, db } from '../services/firebase';

describe("Testing unauthorized access", () => {   
  beforeAll(async () => {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  });

  const email1 = "erik@gmail.com";
  const password1 = "pervioussenha";

  const email2 = "teste@gmail.com";
  const password2 = "hackersenha";

  it("it is not possible to access personal data from another user's account", async () => {
    // Create two users
    const newUserCredential = await createUserWithEmailAndPassword(auth, email1, password1);
    const user = newUserCredential.user;
    await auth.signOut();

    const anotherUserCredential = await createUserWithEmailAndPassword(auth, email2, password2);
    const userHacker = anotherUserCredential.user;
    
    // Try to access the user account using uid, expect to fail
    const userDoc = doc(db, 'users', user?.uid);
    const userDocHacker = doc(db, 'users', userHacker?.uid);

    // Reject access to user data 
    expect(getDoc(userDoc)).rejects.toThrow();

    // Allow access to user data
    expect(getDoc(userDocHacker)).rejects.not.toThrow();
  });

});

