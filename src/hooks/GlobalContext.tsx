import { createContext, useContext } from 'react';

export type GlobalContent = {
  darkTheme: boolean;
  rerenderComponent: boolean;
  setRerenderComponent: (rerender: boolean) => void;
};

export const GlobalContext = createContext<GlobalContent>({
  darkTheme: false,
  rerenderComponent: false,
  setRerenderComponent: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);
