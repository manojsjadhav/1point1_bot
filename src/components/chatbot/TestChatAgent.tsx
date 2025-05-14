import { Avatar, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import "./chatbotcss/testChatAgent.scss";
import { format } from "date-fns";
import chatheaderIcon from "../../assets/chatbotIcon/chatheadericon.svg";
import chrevenIcon from "../../assets/chevron-down.svg";
import threedot from "../../assets/chatbotIcon/threedot.svg";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useEffect, useState } from "react";
import ChatInputBar from "../../pages/emailBot/EmailComponent/ChatInputBar";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchChatHistory } from "../../services/chatServices";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import NoData from "../NoData";
import { useChatSocket } from "../../hooks/useChatSocket";

const TestChatAgent = ({ selectedContact }: any) => {
  console.log({ selectedContact });
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const chatHistory = useSelector((state: RootState) => state.chatHistory);
  const { chatAgent } = useSelector((state: RootState) => state.chatAgent);
  const { agents } = useSelector((state: RootState) => state.agents);
  const [agentSelect, setAgentSelect] = useState<any>({});
  const dispatch = useDispatch<AppDispatch>();
  const { messages, sendMessage } = useChatSocket({
    agentId: selectedContact.agent_id,
    userId: selectedContact.user_id,
    contactId: selectedContact.id,
  });
  const { auth } = useSelector((state: RootState) => state);
  const user_id: any = auth?.response?.user_id;
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log({ agentSelect });
  useEffect(() => {
    let id = agentSelect?.id;
    if (user_id && id) {
      dispatch(fetchChatHistory({ user_id, id }));
    }
  }, [agentSelect]);
  return (
    <Box
      className="chatagent-container"
      sx={{ borderLeft: "1px solid #41414b" }}
    >
      {chatHistory?.data?.length > 0 || chatAgent?.[0]?.agent_name ? (
        <Box className="chatagent-wrapper">
          <Box className="chatagent-content">
            <Box className="chatheader">
              <Box className="header-content">
                <Box className="leftside">
                  <Avatar
                    src="/profile.jpg"
                    sx={{ width: 28.5, height: 28.5 }}
                  />
                  <Typography className="agent">
                    {chatAgent?.[0]?.agent_name}
                  </Typography>
                  <Box
                    component="img"
                    src={chatheaderIcon}
                    alt="Collapse"
                    sx={{ width: 85, height: 20 }}
                  />
                </Box>
                <Box className="rightside">
                  {location?.pathname === "/chatbot/chat" ? (
                    <StarBorderIcon
                      fontSize="small"
                      sx={{ color: "#B8B9C1" }}
                    />
                  ) : (
                    <div>
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        className="agent-dropdown"
                      >
                        Change Agent
                        <Box
                          component="img"
                          src={chrevenIcon}
                          alt="Publish"
                          sx={{ width: 22, height: 22 }}
                        />
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        {agents?.map((agent: any) => (
                          <MenuItem
                            key={agent.id}
                            onClick={() => {
                              setAgentSelect(agent);
                              handleClose();
                            }}
                          >
                            {agent?.agent_name}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  )}

                  <Box
                    component="img"
                    src={threedot}
                    alt="Publish"
                    sx={{ width: 22, height: 22 }}
                  />
                </Box>
              </Box>
            </Box>
            <Box className="chat-container">
              <Box className="chat-container">
                {messages?.length > 0 &&
                  messages?.map((msg: any) => (
                    <Box
                      key={msg.id}
                      className={`chat-message ${msg.message_type}`}
                    >
                      <Typography className="message-text">
                        {msg.message}
                      </Typography>
                      {msg.created_date && (
                        <Typography className="message-time">
                          {format(new Date(msg.created_date), "hh:mm a")}
                        </Typography>
                      )}
                    </Box>
                  ))}
              </Box>
            </Box>
            <Box className="chat-input">
              <ChatInputBar sendMessage={sendMessage} />
            </Box>
          </Box>
        </Box>
      ) : (
        <NoData />
      )}
    </Box>
  );
};

export default TestChatAgent;
