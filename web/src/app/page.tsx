"use client";

import React, { useEffect, useContext, useState } from 'react';
import { User } from 'firebase/auth';
import { Center, Spinner } from "@chakra-ui/react";

import { AuthContext } from '@/contexts/useAuth';

import { Auth } from "@/app/auth/page";
import { Home as HomePage } from '@/app/conta/page';

import { auth } from '@/services/firebase';

export default function Home() {
  const { user, setUser, userInformations, handleGetUserInformations } = useContext(AuthContext);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user: User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); // unsubscribe on unmount
  }, []);

  if (initializing) return (
    <Center style={{display: 'flex', width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
      <Spinner size="xl" color="white" />
    </Center>
  );
  if (!user) {
    return (
      <Auth />
    );
  }
  if(user && !userInformations) {
    handleGetUserInformations()
    return (
      <Center style={{display: 'flex', width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
        <Spinner size="xl" color="white" />
      </Center>
    )
  }
  if(user && userInformations) {
    return (
      <HomePage />
    )  
  }
}
