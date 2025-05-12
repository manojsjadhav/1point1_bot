import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { setBreadcrumbs } from "../../../redux/nodeSlice/breadcrumbSlice";
import { Layout } from "../../../components";
import TestChatAgent from "../../../components/chatbot/TestChatAgent";

const TestBot = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        { label: "Chat Agent", path: "/chatbot/ai-agents" },
        { label: "CHat Test", path: "/chatbot" },
      ])
    );
  }, []);

  return (
    <>
      <Layout>
        <TestChatAgent />
      </Layout>
    </>
  );
};

export default TestBot;
