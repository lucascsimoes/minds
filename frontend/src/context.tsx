import React, { createContext, useState, ReactNode, useContext } from 'react';
import { IUser } from './interfaces/IUser';

interface UserContextType {
  data: Pick<IUser, 'name' | 'balance'>;
  setData: React.Dispatch<React.SetStateAction<Pick<IUser, 'name' | 'balance'>>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [data, setData] = useState<Pick<IUser, 'name' | 'balance'>>({ name: '', balance: 0 });

  return (
    <UserContext.Provider value={{ data, setData }}>
      {children}
    </UserContext.Provider>
  );
};

// Crie um hook para usar o contexto
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a Provider');
  }
  return context;
};
