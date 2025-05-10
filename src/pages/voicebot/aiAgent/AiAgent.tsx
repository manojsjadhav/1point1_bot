import { useSelector } from "react-redux";
import "../../../nodes/agentCustomNode.scss";
import { Layout } from "../../../components";
import VoiceAgentFlow from "../../../components/agentcreation/VoiceAgentFlow";
import { AppDispatch, RootState } from "../../../redux/store";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAgentList,
  fetchEmailBotAgentList,
} from "../../../services/agentFlowServices";
import AgentLists from "../../../components/agentcreation/agentlists/AgentLists";
import { agentStore } from "../../../providers/AgentContext";
import { setBreadcrumbs } from "../../../redux/nodeSlice/breadcrumbSlice";
import { setInitialNodes } from "../../../redux/nodeSlice/nodeSlice";

function AiAgent() {
  const { agentDetails, setAgentDetails, agentFlowtoggle } =
    useContext(agentStore);
  const { auth } = useSelector((state: RootState) => state);
  const user_id = auth?.response?.user_id;
  const username = auth?.response?.username;
  const dispatch = useDispatch<AppDispatch>();

  const selectedBotName = useSelector((state: RootState) => state.selectBot);
  const mailBotSelected = selectedBotName?.selectedBot === "Email_Bot";

  useEffect(() => {
    setAgentDetails({ ...agentDetails, user_id, created_by: username });
  }, [agentFlowtoggle]);

  useEffect(() => {
    if (mailBotSelected) {
      dispatch(fetchEmailBotAgentList());

      dispatch(
        setBreadcrumbs([
          { label: "My Agent", path: "emailBot/emailBotAIAgents" },
        ])
      );
    } else {
      dispatch(fetchAgentList(user_id));
      dispatch(
        setBreadcrumbs([{ label: "Voice Agent", path: "voicebot/ai-agents" }])
      );
    }
    dispatch(setInitialNodes([]));
  }, []);

  return (
    <Layout>{agentFlowtoggle ? <AgentLists /> : <VoiceAgentFlow />}</Layout>
  );
}

export default AiAgent;
