import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { setBreadcrumbs } from "../../../redux/nodeSlice/breadcrumbSlice";
import { Layout } from "../../../components";
import TestChatAgent from "../../../components/chatbot/TestChatAgent";
import {
  fetchChatHistory,
  getChatbotAgent,
} from "../../../services/chatServices";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AddChatDetails from "../../../components/chatbot/AddChatDetails";

const TestBot = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector((state: RootState) => state);
  const user_id: any = auth?.response?.user_id;
  const { id } = useParams();

  useEffect(() => {
    console.log("check userid and agentid:", user_id, id);
    if (user_id && id) {
      dispatch(fetchChatHistory({ user_id, id }));
      dispatch(getChatbotAgent(id));
    }
    dispatch(
      setBreadcrumbs([
        { label: "Chat Agent", path: "/chatbot/ai-agents" },
        { label: "Chat Test", path: "/chatbot" },
      ])
    );
  }, []);

  return (
    <>
      <Layout>
        {openForm ? (
          <TestChatAgent />
        ) : (
          <AddChatDetails setOpenForm={setOpenForm} />
        )}
      </Layout>
    </>
  );
};

export default TestBot;
