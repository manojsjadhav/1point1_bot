import { createContext, useEffect, useState } from "react";

export const authStore = createContext<any>(null);

const AuthContext = ({ children }: any) => {
  const [userToken, setUserToken] = useState<any>(null);
  const [tokenToggle, setTokenToggle] = useState<boolean>(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem("logintoken");
    if (token) {
      setUserToken(JSON.parse(token));
    }
    setLoading(false);
  }, [tokenToggle]);

  return (
    <authStore.Provider value={{ userToken, setUserToken, tokenToggle, setTokenToggle, loading }}>
      {children}
    </authStore.Provider>
  );
};

export default AuthContext;
