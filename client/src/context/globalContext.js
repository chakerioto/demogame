import { createContext } from "react";

const initState = {
  user: {},
};

// create context
export const GlobalContext = createContext(initState);

export const GlobalProvider = GlobalContext.Provider;
export const GlobalConsume = GlobalContext.Consumer;

export default GlobalContext;
