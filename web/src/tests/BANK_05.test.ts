import 'isomorphic-fetch';
import { auth, db } from '../services/firebase';
import { signInWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { userInformations } from '@/types/auth.types';

describe("Testing get informations", () => {   
  beforeAll(async () => {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    await auth.signOut();
  });

  const email = "pervious@gmail.com";
  const password = "senhadificil";

  it("login and get informations", async () => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    expect(user).not.toBeNull();

    const docRef = doc(db, 'users', user?.uid);
    const docSnap = (await getDoc(docRef)).data() as userInformations;
    
    expect(docSnap).toHaveProperty('username');
    expect(docSnap).toHaveProperty('agency');
    expect(docSnap).toHaveProperty('account');
    expect(docSnap).toHaveProperty('balance');
    expect(docSnap).toHaveProperty('isActive');
    expect(docSnap).toHaveProperty('creditCard');
    expect(docSnap).toHaveProperty('lastLogin');
  });
});