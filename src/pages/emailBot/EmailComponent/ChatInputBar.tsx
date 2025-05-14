import { Box, Button, IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
// import UndoIcon from '@mui/icons-material/Undo';
// import RedoIcon from '@mui/icons-material/Redo';
// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
// import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import {
  Undo as UndoIcon,
  Redo as RedoIcon,
  FormatAlignLeft as AlignLeftIcon,
  FormatAlignCenter as AlignCenterIcon,
  FormatAlignRight as AlignRightIcon,
  FormatAlignJustify as JustifyIcon,
  Title as TitleIcon,
  FormatItalic as ItalicIcon,
  FormatBold as BoldIcon,
  FormatUnderlined as UnderlineIcon,
  AttachFile as AttachFileIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import { useState } from "react";

const ChatInputBar = ({ sendMessage }: any) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      sendMessage(message);
      setMessage("");
    }
  };
  const iconStyle = {
    color: "#B8B9C1",
    fontSize: 20,
  };

  return (
    <Box
      sx={{
        bgcolor: "#1e1e25",
        p: 2,
        borderTop: "1px solid #4C4D58",
        borderBottom: "1px solid #4C4D58 ",
      }}
    >
      <Box
        sx={{
          bgcolor: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100px",
          p: 2,
        }}
      >
        <TextField
          fullWidth
          multiline
          placeholder="Type message..."
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: {
              color: "#fff",
              fontSize: "15px",
            },
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* Left Group */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#2a2a33",
                borderRadius: "8px",
                px: 1,
                py: 0.5,
                gap: 0.5,
                border: "1px solid #4C4D58",
              }}
            >
              <IconButton size="small">
                <UndoIcon sx={iconStyle} />
              </IconButton>
              <IconButton size="small">
                <RedoIcon sx={iconStyle} />
              </IconButton>
              <IconButton size="small">
                <AlignLeftIcon sx={iconStyle} />
              </IconButton>
              <IconButton size="small">
                <AlignCenterIcon sx={iconStyle} />
              </IconButton>
              <IconButton size="small">
                <AlignRightIcon sx={iconStyle} />
              </IconButton>
              <IconButton size="small">
                <JustifyIcon sx={iconStyle} />
              </IconButton>
              <IconButton size="small">
                <TitleIcon sx={iconStyle} />
              </IconButton>
              <IconButton size="small">
                <ItalicIcon sx={iconStyle} />
              </IconButton>
              <IconButton size="small">
                <BoldIcon sx={iconStyle} />
              </IconButton>
              <IconButton size="small">
                <UnderlineIcon sx={iconStyle} />
              </IconButton>
            </Box>

            {/* Right Group */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#2a2a33",
                borderRadius: "8px",
                px: 1,
                py: 0.5,
                gap: 0.5,
                border: "1px solid #4C4D58",
              }}
            >
              <IconButton size="small">
                <AttachFileIcon sx={iconStyle} />
              </IconButton>
              <IconButton size="small">
                <ImageIcon sx={iconStyle} />
              </IconButton>
            </Box>
          </Box>

          <Button
            variant="contained"
            endIcon={<Send />}
            onClick={handleSendMessage}
            sx={{
              backgroundColor: "#FF5E2B",
              color: "#fff",
              textTransform: "none",
              px: 3,
              "&:hover": {
                backgroundColor: "#e55324",
              },
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatInputBar;
