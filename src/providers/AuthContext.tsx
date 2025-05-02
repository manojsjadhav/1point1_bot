import { createContext, useEffect, useState } from "react";

export const authStore: any = createContext(null);

const AuthContext = ({ children }: any) => {
  const [userToken, setUserToken] = useState<any>(null);
  const [tokenToggle, setTokenToggle] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem("logintoken");
    console.log({ token });
    if (token) {
      setUserToken(JSON.parse(token));
    }
  }, [tokenToggle]);
  return (
    <authStore.Provider value={{ userToken, tokenToggle, setTokenToggle }}>
      {children}
    </authStore.Provider>
  );
};

export default AuthContext;
