import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import Configuration from "../../assets/Configuration.svg";
import Search from "../../assets/Search.svg";
import MenuItems from "./MenuItems";
import NodeLists from "./NodeLists";
import { useContext, useEffect } from "react";
import { agentStore } from "../../providers/AgentContext";
import { useDispatch } from "react-redux";
import { setBreadcrumbs } from "../../redux/nodeSlice/breadcrumbSlice";
import { ReactFlowProvider } from "@xyflow/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const VoiceAgentFlow = () => {
  const dispatch = useDispatch();
  const selectedBotName = useSelector((state: RootState) => state.selectBot);
  const { agentDetails } = useContext(agentStore);
  useEffect(() => {
    if (agentDetails.agent_type) {
      if (selectedBotName?.selectedBot === "Voice_Bot") {
        dispatch(
          setBreadcrumbs([
            { label: "Voice Agent", path: "/voicebot/ai-agents" },
            { label: agentDetails.agent_type, path: "/voicebot" },
          ])
        );
      } else if (selectedBotName?.selectedBot === "Chat_Bot") {
        dispatch(
          setBreadcrumbs([
            { label: "Chat Agent", path: "/chatbot/ai-agents" },
            { label: agentDetails.agent_type, path: "/chatbot" },
          ])
        );
      } else if (selectedBotName?.selectedBot === "Email_Bot") {
        dispatch(
          setBreadcrumbs([
            { label: "My Email Agent", path: "/emailBot/ai-agents" },
            { label: agentDetails.agent_type, path: "/emailBot" },
          ])
        );
      }
    }
  }, []);
  
  return (
    <ReactFlowProvider>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box
          sx={{
            width: "260px",
            height: "966px",
            background: "#18181B",
            borderLeft: "1px solid #41414B",
            borderRight: "1px solid #41414B",
          }}
        >
          <Box
            sx={{
              px: "10px",
              py: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  pt: "5px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "GeneralSans-m",
                    fontSize: "16px",
                    color: "#fff",
                  }}
                >
                  Components
                </Typography>
                <Box>
                  <Box
                    component="img"
                    src={Configuration}
                    alt="group"
                    sx={{ width: 24, height: 24 }}
                  />
                </Box>
              </Box>
              <TextField
                variant="outlined"
                placeholder="Search"
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    border: "1px solid #41414B",
                    borderRadius: "8px",
                    height: "36px",
                    mt: "12px",
                    "&.Mui-focused fieldset": {
                      borderColor: "#FF581C",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "#B8B9C1",
                    fontFamily: "GeneralSans-m",
                    fontSize: "14px",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        component="img"
                        src={Search}
                        alt="User Icon"
                        sx={{ width: 24, height: 24 }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box>
              <MenuItems />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            height: "966px",
            background: "#000",
          }}
        >
          <NodeLists />
        </Box>
      </Box>
    </ReactFlowProvider>
  );
};

export default VoiceAgentFlow;
