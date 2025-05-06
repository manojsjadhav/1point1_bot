import { useEffect } from "react";
import { Layout } from "../../../components";
import { setBreadcrumbs } from "../../../redux/nodeSlice/breadcrumbSlice";
import { useDispatch } from "react-redux";

const VoiceBotDashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        { label: "Dashboard", path: "/voicebot" },
      ])
    );
  }, [dispatch]);
  return (
    <Layout>
      <div>Dashboard</div>
    </Layout>
  );
};

export default VoiceBotDashboard;
