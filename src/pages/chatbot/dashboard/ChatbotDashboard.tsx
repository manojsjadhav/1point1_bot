import { useDispatch } from "react-redux";
import { Layout } from "../../../components";
import { useEffect } from "react";
import { setBreadcrumbs } from "../../../redux/nodeSlice/breadcrumbSlice";

const ChatbotDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBreadcrumbs([{ label: "Chat Dashboard", path: "/chatbot" }]));
  }, [dispatch]);
  return (
    <>
      <Layout>
        <div>ChatbotDashboard</div>
      </Layout>
    </>
  );
};

export default ChatbotDashboard;
