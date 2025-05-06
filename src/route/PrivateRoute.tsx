import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authStore } from "../providers/AuthContext";

const PrivateRoute = ({ children }: any) => {
  const { userToken, loading } = useContext(authStore);

  if (loading) {
    return <div>Loading...</div>;
  }

  return userToken ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
