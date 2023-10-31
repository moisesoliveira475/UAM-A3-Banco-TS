"use client";

import React, { createContext, useState, useEffect } from 'react';
import { Timestamp, doc, setDoc, getDoc, updateDoc, query, collection, where, getDocs, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, User } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';

import { auth, db, functions } from '@/services/firebase';

import { randomKey } from '@/utils/randomKey';
import { userInformations } from '@/types/auth.types';
import { useToast } from '@chakra-ui/react';
import { calcDynamicCredit } from '@/utils/calcDynamicCredit';

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userInformations: userInformations | null;
  handleCreateUser: (username: string, email: string, password: string) => Promise<void>;
  handleSignOut: () => Promise<void>;
  handleSignIn: (email: string, password: string) => Promise<void>;
  handleGetUserInformations: () => Promise<void>;
  handleDeposit: (value: number) => Promise<void>;
  handleWithdraw: (value: number) => Promise<void>;
  handleTransfer: (value: number, account: number, agency: number) => Promise<void>;
  handleLoanRequested: (value: number) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const toast = useToast();

  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [userInformations, setUserInformations] = useState<AuthContextType['userInformations']>(null);

  async function handleCreateUser(username: string, email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      
      const userData = {
        username,
        agency: Number(randomKey(2)),
        account: Number(randomKey(6)),
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
      } as userInformations;

      const docRef = doc(db, 'users', user?.uid); 
      await setDoc(docRef, userData)
      .finally(() => {
        setUserInformations(userData);
        setUser(user);
      });
    })
    .catch((error) => {
      toast({
        title: error.code,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  async function handleSignIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      const docRef = doc(db, 'users', user?.uid);
      await updateDoc(docRef, {lastLogin: Timestamp.now()});
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserInformations(docSnap.data() as AuthContextType['userInformations']);
        console.log(docSnap.data());
        setUser(user);
      } else {
        alert('Usuário não encontrado');
      }
    })
    .catch((error) => {
      toast({
        title: error.code,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  }

  async function handleSignOut() {
    await signOut(auth)
    .finally(() => {
      setUser(null);
      setUserInformations(null);
    });
  }

  async function handleGetUserInformations() {
    if(!user) return handleSignOut();

    const docRef = doc(db, 'users', user?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserInformations(docSnap.data() as AuthContextType['userInformations']);
    } else {
      alert('Usuário não encontrado');
    }
  }

  async function handleDeposit(value: number) {
    if(!userInformations) return handleSignOut();

    await httpsCallable(functions, 'handleDeposit')({value: value, userUid: user?.uid})
    .then((response) => {
      const result = response.data as {resultType: 'success' | 'error', resultMessage: string};
      if(result.resultType === 'success') {
        setUserInformations({
          ...userInformations,
          balance: userInformations.balance + value,
          totalDeposits: userInformations.totalDeposits + value,
          historicOfMovements: [{
            value,
            date: Timestamp.now(),
            type: 'deposit',
          }, ...userInformations.historicOfMovements],
          historicOfBalance: [...userInformations.historicOfBalance, {value: userInformations.balance + value, date: Timestamp.now()}]
        });
        toast({
          title: result.resultMessage,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: result.resultMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    })
    .catch((error) => {
      toast({
        title: error.code,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  }

  async function handleWithdraw(value: number) {
    if(!userInformations) return handleSignOut();

    if(userInformations.balance < value) {
      toast({
        title: "Saldo insuficiente.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    await httpsCallable(functions, 'handleWithdraw')({value: value, userUid: user?.uid})
    .then((response) => {
      const result = response.data as {resultType: 'success' | 'error', resultMessage: string};
      if(result.resultType === 'success') {
        setUserInformations({
          ...userInformations,
          balance: userInformations.balance - value,
          totalWithdraws: userInformations.totalWithdraws + value,
          historicOfMovements: [{
            value,
            date: Timestamp.now(),
            type: 'withdraw',
          }, ...userInformations.historicOfMovements],
          historicOfBalance: [...userInformations.historicOfBalance, {value: userInformations.balance - value, date: Timestamp.now()}]
        });
        toast({
          title: result.resultMessage,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: result.resultMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    })
    .catch((error) => {
      toast({
        title: error.code,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  }

  async function handleTransfer(value: number, account: number, agency: number) {
    if(!userInformations) return handleSignOut();
    if(userInformations.balance < value) {
      toast({
        title: "Saldo insuficiente.",
        status: "warning",
        duration: 3000,
        isClosable: true, 
      });
      return;
    }

    await httpsCallable(functions, 'handleTransfer')({value: value, userUid: user?.uid, account: account, agency: agency})
    .then((response) => {
      const result = response.data as {resultType: 'success' | 'error', resultMessage: string};
      if(result.resultType === 'success') {
        setUserInformations({
          ...userInformations,
          balance: userInformations.balance - value,
          totalTransfers: userInformations.totalTransfers + value,
          historicOfMovements: [{
            value,
            date: Timestamp.now(),
            type: 'transfer@sent',
          }, ...userInformations.historicOfMovements],
          historicOfBalance: [...userInformations.historicOfBalance, {value: userInformations.balance - value, date: Timestamp.now()}]
        });
        toast({
          title: result.resultMessage,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: result.resultMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    })
    .catch((error) => {
      toast({
        title: error.code,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  }

  async function handleLoanRequested(value: number) {
    if(!userInformations) return handleSignOut();
    if(value < 0) {
      toast({
        title: "Insira um valor válido.",
        status: "error",
        duration: 3000,
        isClosable: true, 
      });
      return;
    }

    await httpsCallable(functions, 'handleLoanRequested')({userUid: user?.uid, value: value})
    .then((response) => {
      const result = response.data as {resultType: 'success' | 'error', resultMessage: string};
      if(result.resultType === 'success') {
        setUserInformations({
          ...userInformations,
          balance: userInformations.balance + value,
          creditCard: {
            ...userInformations.creditCard,
            availableCredit: userInformations.creditCard.availableCredit - value,
            debt: userInformations.creditCard.debt + value,
          },
          historicOfMovements: [{
            value,
            date: Timestamp.now(),
            type: 'credit@loan',
          }, ...userInformations.historicOfMovements],
          historicOfBalance: [...userInformations.historicOfBalance, {value: userInformations.balance + value, date: Timestamp.now()}]
        });
        toast({
          title: result.resultMessage,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: result.resultMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    })
    .catch((error) => {
      toast({
        title: error.code,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  }

  return (  
    <AuthContext.Provider 
    value={{ 
      user, 
      setUser, 
      userInformations, 
      handleCreateUser, 
      handleSignOut, 
      handleSignIn,
      handleGetUserInformations,
      handleDeposit,
      handleWithdraw,
      handleTransfer,
      handleLoanRequested
    }}>
      {children}
    </AuthContext.Provider>
  )
}