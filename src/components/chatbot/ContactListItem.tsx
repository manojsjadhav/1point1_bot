import { Box, Typography, IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  getChatbotAgent,
  getChatHistoryByContact,
} from "../../services/chatServices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
const boxStyle = {
  display: "flex",
  alignItems: "center",
  padding: "12px",
  margin: "8px 10px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "8px",
  backgroundColor: "#2a2a33",
  position: "relative",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    left: -6,
    top: 0,
    bottom: 0,
    width: "3px",
  },
};

const ContactListItem = ({ chatContact, onStar }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleOpenChat = (email: any) => {
    const contactId = email.id;
    const id = email.user_id;
    console.log(contactId, "contact id");
    dispatch(getChatHistoryByContact(contactId));
    dispatch(getChatbotAgent(id));
  };
  return (
    <Box sx={boxStyle} onClick={() => handleOpenChat(chatContact)}>
      <Box
        sx={{
          width: 36,
          height: 36,
          marginRight: 1.5,
          marginBottom: "25px",
          background: "gray",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span>{chatContact?.firstname?.[0]}</span>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.5,
          }}
        >
          <Typography variant="subtitle2" fontSize={14} noWrap>
            {`${chatContact.firstname} ${chatContact.lastname} `}
          </Typography>
          <Box color="#D9D9DE" display="flex" alignItems="center" gap={1}>
            <Typography variant="caption">10.02 AM</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <Typography
            variant="body2"
            noWrap
            sx={{
              color: "#D9D9DE",
              fontSize: "12px",
            }}
          >
            {chatContact.email}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="body2"
            noWrap
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "12px",
              lineHeight: "1.2",
              color: "#B8B9C1",
              maxWidth: "90%",
              whiteSpace: "normal",
            }}
          >
            {chatContact.phone_number}
          </Typography>

          <IconButton
            size="small"
            sx={{ p: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              onStar();
            }}
          >
            <StarBorderIcon fontSize="small" sx={{ color: "#B8B9C1" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactListItem;
