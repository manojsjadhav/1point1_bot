import {
  Button,
  Box,
  Typography,
  Divider,
  TextField,
  Drawer,
} from "@mui/material";
import Arrow_Left_SM from "../../assets/agentdialogicon/Arrow_Left_SM.svg";
import { useContext, useEffect, useState } from "react";
import { agentStore } from "../../providers/AgentContext";
import { voiceAgentType, chatAgentTypes } from "../../constants/agentType";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AgentInfoDialogBox = ({ open, handleClose, textFieldStyle }: any) => {
  const [typeValue, setTypeValue] = useState<any>("");
  const [agentType, setAgentType] = useState<any>([]);
  const selectedBotName = useSelector((state: RootState) => state.selectBot);
  const { agentFlowtoggle, setAgentFlowtoggle, setAgentDetails, agentDetails } =
    useContext(agentStore);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAgentDetails((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleChangeClick = (value: any, prompt: any) => {
    setAgentDetails((prev: any) => ({
      ...prev,
      agent_type: value,
      system_prompt: prompt,
    }));
    setTypeValue(value);
  };

  const handleCreateAgent = () => {
    const isAnyFieldEmpty = Object.values(agentDetails).some(
      (val: any) => val === "" || val === null || val === undefined
    );
    if (isAnyFieldEmpty) {
      alert("Please fillup all fields");
    } else {
      setAgentFlowtoggle(!agentFlowtoggle);
    }
  };
  useEffect(() => {
    if (selectedBotName?.selectedBot === "Voice_Bot") {
      setAgentType(voiceAgentType);
    } else if (selectedBotName?.selectedBot === "Chat_Bot") {
      setAgentType(chatAgentTypes);
    }
  }, []);
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          p: "11px",
          backgroundColor: "#2A2A33",
          width: "447px",
        },
      }}
    >
      <Box className="dialog-heading">
        <Box
          component="img"
          src={Arrow_Left_SM}
          alt="User Icon"
          sx={{ width: 24, height: 24 }}
        />

        <Typography className="text">Create an AI Agent</Typography>
      </Box>
      <Divider sx={{ backgroundColor: "#41414B", mt: "5px" }} />
      <Box>
        <Typography className="text" sx={{ mt: "20px" }}>
          1. Add Agent Name
        </Typography>
        <TextField
          name="agent_name"
          variant="outlined"
          placeholder="eg. XYZ Support Agent"
          sx={{
            ...textFieldStyle,
            width: "100%",
            mt: "6px",
            "& .MuiInputBase-input": {
              color: "#fff",
              padding: "10px 12px",
            },
          }}
          value={agentDetails.agent_name}
          onChange={handleChange}
        />

        <Typography className="text" sx={{ mt: "20px" }}>
          2. Flow Type
        </Typography>
        <select
          name="flow_type"
          value={agentDetails.flow_type}
          onChange={handleChange}
          className="custom-select"
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="speech to speech">Speech to Speech</option>
          <option value="flow">Flow</option>
        </select>

        <Typography className="text" sx={{ mt: "20px" }}>
          3. Dialer
        </Typography>
        <select
          name="dialer"
          value={agentDetails.dialer}
          onChange={handleChange}
          className="custom-select"
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="free switch">Free Switch</option>
        </select>

        <Typography className="text" sx={{ my: "20px" }}>
          4. Choose the right Agent template to build your AI Agent.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {agentType.map((agent: any, index: any) => (
          <Box
            key={index}
            className="agent-type"
            onClick={() => handleChangeClick(agent.value, agent.system_prompt)}
            sx={{
              border:
                agent.value === typeValue
                  ? "1px solid #ff581c"
                  : "1px solid #41414b",
            }}
          >
            <Box
              component="img"
              src={agent.icon}
              alt="User Icon"
              sx={{ width: 34, height: 34 }}
            />
            <Typography className="agent-title">{agent.title}</Typography>
            <Typography className="agent-descri">
              {agent.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Button
        className="btn"
        sx={{ width: "100%", mt: "20px", mb: "20px" }}
        onClick={() => handleCreateAgent()}
      >
        Create New Agent +
      </Button>
    </Drawer>
  );
};

export default AgentInfoDialogBox;
