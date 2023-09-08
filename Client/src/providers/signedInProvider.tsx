import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type DefaultContextValue = {
  isSignedIn: boolean;
  setIsSignedIn(value: boolean): void;
};
const defaultValue: DefaultContextValue = {
  isSignedIn: false,
  setIsSignedIn: () => {},
};

const SignedInContext = createContext(defaultValue);

export const SignedInProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
        setIsSignedIn(true);
    }
  }, [])
  

  return (
    <SignedInContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </SignedInContext.Provider>
  );
};

export const useSignedInContext = () => useContext(SignedInContext);
