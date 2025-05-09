import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PrivateRoute = ({ children }: any) => {
  const { token, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
