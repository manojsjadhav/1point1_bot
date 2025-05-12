import { Avatar, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import "./chatbotcss/testChatAgent.scss";
import chatheaderIcon from "../../assets/chatbotIcon/chatheadericon.svg";
import chrevenIcon from "../../assets/chevron-down.svg";
import threedot from "../../assets/chatbotIcon/threedot.svg";
import { useState } from "react";

const TestChatAgent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box className="chatagent-container">
      <Box className="chatagent-wrapper">
        <Box className="chatagent-content">
          <Box className="chatheader">
            <Box className="header-content">
              <Box className="leftside">
                <Avatar src="/profile.jpg" sx={{ width: 28.5, height: 28.5 }} />
                <Typography className="agent">agent Name</Typography>
                <Box
                  component="img"
                  src={chatheaderIcon}
                  alt="Collapse"
                  sx={{ width: 85, height: 20 }}
                />
              </Box>
              <Box className="rightside">
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
                    <MenuItem onClick={handleClose}>agent </MenuItem>
                    <MenuItem onClick={handleClose}>agent</MenuItem>
                    <MenuItem onClick={handleClose}>agent</MenuItem>
                  </Menu>
                </div>
                <Box
                  component="img"
                  src={threedot}
                  alt="Publish"
                  sx={{ width: 22, height: 22 }}
                />
              </Box>
            </Box>
          </Box>
          <Box className="chat-container"> chat </Box>
          <Box className="chat-input"> typeing</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TestChatAgent;
