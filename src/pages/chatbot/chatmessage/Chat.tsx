import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Menu,
} from "@mui/material";
import "../../../components/chatbot/chatbotcss/CodePopup.scss";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Layout } from "../../../components";
import { Search } from "@mui/icons-material";
import chrevenIcon from "../../../assets/chevron-down.svg";
import TestChatAgent from "../../../components/chatbot/TestChatAgent";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import {
  fetchChatContact,
  getAgentChatConstct,
} from "../../../services/chatServices";
import ChatContactList from "../../../components/chatbot/ChatContactList";

const Chat: React.FC = () => {
  const { chatContact } = useSelector((state: RootState) => state.chatContacts);
  const [selectedContact, setSelectedContact] = useState<any>({});
  const { agents } = useSelector((state: RootState) => state.agents);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [agentSelect, setAgentSelect] = useState<any>({});
  const [keywordFilter, setKeywordFilter] = useState("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector((state: RootState) => state);
  const user_id = auth?.response?.user_id;

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let id = agentSelect?.id;
    if (user_id && id) {
      dispatch(getAgentChatConstct({ user_id, id }));
    } else {
      dispatch(fetchChatContact({ user_id }));
    }
  }, [agentSelect]);

  useEffect(() => {
    if (user_id) {
      dispatch(fetchChatContact({ user_id }));
    }
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#18181b",
          color: "#ffffff",
          borderLeft: "1px solid #41414b",
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography className="heading">Chat</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="agent-dropdown"
                sx={{
                  width: "170px",
                  bgcolor: "#18181b",
                  border: "1px solid #444",
                  borderRadius: "8px",
                  color: "#B8B9C1",
                  height: "52px",
                  fontFamily: "GeneralSans-m",
                  textTransform: "none",
                  fontSize: "16px",
                }}
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
            <TextField
              placeholder="Search by Keyword"
              size="small"
              value={keywordFilter}
              onChange={(e) => setKeywordFilter(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                width: 200,
                bgcolor: "#18181b",
                border: "1px solid #444",
                borderRadius: "8px",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  pl: 1,
                },
                input: {
                  color: "#fff",
                  p: "10px",
                },
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={(date: any) => setFromDate(date)}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: {
                      width: 200,
                      bgcolor: "#18181b",
                      border: "1px solid #444",
                      borderRadius: "8px",
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        pl: 1,
                      },
                      "& .MuiInputBase-input": {
                        color: "#B8B9C1",
                        padding: "10px",
                        "::placeholder": {
                          color: "#B8B9C1",
                          opacity: 0.7,
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#B8B9C1",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#B8B9C1",
                      },
                    },
                  },
                }}
              />
              <DatePicker
                label="To Date"
                value={toDate}
                onChange={(date: any) => setToDate(date)}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: {
                      width: 200,
                      bgcolor: "#18181b",
                      border: "1px solid #444",
                      borderRadius: "8px",
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        pl: 1,
                      },
                      "& .MuiInputBase-input": {
                        color: "#fff",
                        padding: "10px",
                        "::placeholder": {
                          color: "#fff",
                          opacity: 0.7,
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#B8B9C1",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#B8B9C1",
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              startIcon={<Search />}
              sx={{
                borderRadius: "8px",
                bgcolor: "#ff5a1f",
                color: "#fff",
                px: 4,
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Search
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            m: 2,
            overflow: "hidden",
            p: 2,
            gap: 2,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "#2a2a33",
            borderRadius: "8px",
          }}
        >
          <Box sx={{ width: "350px", flexShrink: 0 }}>
            <ChatContactList
              chatContacts={chatContact}
              setSelectedContact={setSelectedContact}
            />
          </Box>

          <Box sx={{ flexGrow: 1, overflow: "hidden", height: "100%" }}>
            <TestChatAgent selectedContact={selectedContact} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Chat;
