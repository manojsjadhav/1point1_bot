import { useSelector } from "react-redux";
import "../../../nodes/agentCustomNode.scss";
import { Layout } from "../../../components";
import VoiceAgentFlow from "../../../components/agentcreation/VoiceAgentFlow";
import { AppDispatch, RootState } from "../../../redux/store";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAgentList } from "../../../services/agentFlowServices";
import AgentLists from "../../../components/agentcreation/agentlists/AgentLists";
import { agentStore } from "../../../providers/AgentContext";
import { setBreadcrumbs } from "../../../redux/nodeSlice/breadcrumbSlice";

function AiAgent() {
  const { agentFlowtoggle } = useContext(agentStore);
  const { auth } = useSelector((state: RootState) => state);
  const user_id = auth.response.user_id;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAgentList(user_id));
    dispatch(
      setBreadcrumbs([{ label: "My Agent", path: "voicebot/ai-agents" }])
    );
  }, []);
  return (
    <Layout>{agentFlowtoggle ? <AgentLists /> : <VoiceAgentFlow />}</Layout>
  );
}

export default AiAgent;
