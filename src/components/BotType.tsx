import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setSelectedBotName } from "../redux/nodeSlice/selectBotSlice";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";

const BotType = ({ icon, botName, route, description, label }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleBotClick = () => {
    navigate(route);
    dispatch(setSelectedBotName(label));
    // localStorage.setItem("selectedBotName", label);
  };

  return (
    <Box
      onClick={handleBotClick}
      sx={{
        background: "#18181B",
        width: "323px",
        border: "1px solid #41414B",
        borderRadius: "8px",
        p: "12px",
        cursor: "pointer",
        transition: "border 0.3s ease",
        "&:hover": {
          border: "1px solid #FF581C",
        },
      }}
    >
      <Box sx={{ mb: "8px" }}>
        <Box
          component="img"
          src={icon}
          alt="Onepointone logo"
          sx={{ width: 34, height: 34 }}
        />
      </Box>
      <Typography
        sx={{
          fontFamily: "GeneralSans-m",
          fontSize: "16px",
          color: "#fff",
          mb: "8px",
        }}
      >
        {botName}
      </Typography>
      <Typography
        sx={{ fontWeight: "GeneralSans-r", fontSize: "12px", color: "#D9D9DE" }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default BotType;
