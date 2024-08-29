"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserInfo, UserInfo } from '../utils/userApi';


interface UserContextType{
userInfo: UserInfo | null
}

// Define the context
const UserContext = createContext<UserContextType | undefined>(undefined);


// Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: UserInfo = await getUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{userInfo}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export function useUser(): UserInfo | null {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context.userInfo
}