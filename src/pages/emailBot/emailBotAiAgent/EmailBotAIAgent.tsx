import { useContext, useEffect } from "react";
import { Layout } from "../../../components";
import AgentLists from "../../../components/agentcreation/agentlists/AgentLists";
import { agentStore } from "../../../providers/AgentContext";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { setInitialNodes } from "../../../redux/nodeSlice/nodeSlice";
import { setBreadcrumbs } from "../../../redux/nodeSlice/breadcrumbSlice";
import { fetchEmailBotAgentList } from "../../../services/agentFlowServices";
import VoiceAgentFlow from "../../../components/agentcreation/VoiceAgentFlow";

const EmailBotAIAgent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { agentDetails, setAgentDetails, agentFlowtoggle } =
    useContext(agentStore);
  const { auth } = useSelector((state: RootState) => state);
  const user_id = auth?.response?.user_id;
  const username = auth?.response?.username;

  useEffect(() => {
    dispatch(fetchEmailBotAgentList());
    dispatch(
      setBreadcrumbs([
        { label: "My Email Agent", path: "emailBot/emailBotAIAgents" },
      ])
    );
    dispatch(setInitialNodes([]));
  }, []);

  useEffect(() => {
    setAgentDetails({ ...agentDetails, user_id, created_by: username });
  }, [agentFlowtoggle]);

  return (
    <Layout>{agentFlowtoggle ? <AgentLists /> : <VoiceAgentFlow />}</Layout>
  );
};

export default EmailBotAIAgent;
