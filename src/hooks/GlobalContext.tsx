import { createContext, useContext } from 'react';

export type GlobalContent = {
  darkTheme: boolean;
};

export const GlobalContext = createContext<GlobalContent>({ darkTheme: false });

export const useGlobalContext = () => useContext(GlobalContext);
