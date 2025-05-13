import { useSelector } from "react-redux";
import "../../../nodes/agentCustomNode.scss";
import { Layout } from "../../../components";
import { AppDispatch, RootState } from "../../../redux/store";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAgentList } from "../../../services/agentFlowServices";
import AgentLists from "../../../components/agentcreation/agentlists/AgentLists";
import { agentStore } from "../../../providers/AgentContext";
import { setBreadcrumbs } from "../../../redux/nodeSlice/breadcrumbSlice";
import { setInitialNodes } from "../../../redux/nodeSlice/nodeSlice";

function AiAgent() {
  const { agentDetails, setAgentDetails, agentFlowtoggle } =
    useContext(agentStore);
  const { auth } = useSelector((state: RootState) => state);
  const user_id = auth?.response?.user_id;
  console.log("user_id in aicomp", user_id);
  const username = auth?.response?.username;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setAgentDetails({ ...agentDetails, user_id, created_by: username });
  }, [agentFlowtoggle]);

  useEffect(() => {
    dispatch(fetchAgentList(user_id));
    dispatch(
      setBreadcrumbs([{ label: "Voice Agent", path: "voicebot/ai-agents" }])
    );

    dispatch(setInitialNodes([]));
  }, []);

  return (
    <Layout>
      <AgentLists />
    </Layout>
  );
}

export default AiAgent;
