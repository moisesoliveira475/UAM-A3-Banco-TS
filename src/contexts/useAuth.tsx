"use client";

import React, { createContext, useState } from 'react';
import { User } from 'firebase/auth';
import { Timestamp, doc, setDoc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth';

import firebaseApp, { auth, db } from '@/services/firebase';

import { randomKey } from '@/utils/randomKey';

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userInformations: {
    username: string;
    agency: number;
    balance: number;
    account: number;
    createdAt: Timestamp;
    isActive: boolean;
  } | null;
  handleCreateUser: (username: string, email: string, password: string) => Promise<void>;
  handleSignOut: () => Promise<void>;
  handleSignIn: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [userInformations, setUserInformations] = useState<AuthContextType['userInformations']>(null);

  async function handleCreateUser(username: string, email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      
      const userData = {
        username,
        agency: Number(randomKey(2)),
        account: Number(randomKey(8)),
        balance: 0,
        createdAt: Timestamp.now(),
        isActive: true,
      };

      const docRef = doc(db, 'users', user?.uid); 
      await setDoc(docRef, userData)
      .finally(() => {
        setUserInformations(userData);
        setUser(user);
      });
    });
  };

  async function handleSignIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      const docRef = doc(db, 'users', user?.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserInformations(docSnap.data() as AuthContextType['userInformations']);
        setUser(user);
      } else {
        alert('Usuário não encontrado');
      }
    });
  }

  async function handleSignOut() {
    await signOut(auth)
    .finally(() => {
      setUser(null);
      setUserInformations(null);
    });
  }

  return (  
    <AuthContext.Provider value={{ user, setUser, userInformations, handleCreateUser, handleSignOut, handleSignIn }}>
      {children}
    </AuthContext.Provider>
  )
}