import { createContext, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const agentStore = createContext<any>(null);

const AgentContext = ({ children }: any) => {
  const { auth } = useSelector((state: RootState) => state);
  const user_id = auth?.response?.user_id;
  const username = auth?.response?.username;
  const [agentDetails, setAgentDetails] = useState<any>({
    user_id,
    created_by: username,
    dialer: "",
    flow_type: "",
    agent_name: "",
    agent_type: "",
    system_prompt: "",
  });
  const [agentFlowtoggle, setAgentFlowtoggle] = useState<any>(true);
  const [editAgentData, setEditAgentData] = useState<any>({});

  return (
    <agentStore.Provider
      value={{
        agentDetails,
        setAgentDetails,
        agentFlowtoggle,
        setAgentFlowtoggle,
        editAgentData,
        setEditAgentData,
      }}
    >
      {children}
    </agentStore.Provider>
  );
};

export default AgentContext;
