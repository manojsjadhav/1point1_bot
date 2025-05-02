import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authStore } from "../providers/AuthContext";

const PrivateRoute = ({ children }: any) => {
  const { userToken } = useContext<any>(authStore);
  const [loading, setLoading] = useState<any>(true);
  console.log(userToken);
  useEffect(() => {
    setLoading(false);
  }, [userToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return userToken === "Login successful" ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
