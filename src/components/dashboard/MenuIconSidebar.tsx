import Group from "../../assets/Group.svg";
import dextop from "../../assets/dextop.svg";
import Headphoneicon from "../../assets/Headphoneicon.svg";
import graph from "../../assets/graph.svg";
import Vector from "../../assets/Vector.svg";
import watch from "../../assets/watch.svg";
import { Box } from "@mui/material";

const MenuIconSidebar = () => {
  return (
    <Box sx={{ width: "72px", height: "966px", background: "#18181B" }}>
      <Box
        sx={{
          px: "20px",
          py: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "7px",
            width: "31px",
            height: "31px",
            background: "#FF581C",
          }}
        >
          <Box
            component="img"
            src={Group}
            alt="group"
            sx={{ width: 15.5, height: 15.5 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "7px",
            width: "31px",
            height: "31px",
            background: "#2A2A33",
          }}
        >
          <Box
            component="img"
            src={Headphoneicon}
            alt="group"
            sx={{ width: 17, height: 17 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "7px",
            width: "31px",
            height: "31px",
            background: "#2A2A33",
          }}
        >
          <Box
            component="img"
            src={watch}
            alt="group"
            sx={{ width: 17, height: 17 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "7px",
            width: "31px",
            height: "31px",
            background: "#2A2A33",
          }}
        >
          <Box
            component="img"
            src={Vector}
            alt="group"
            sx={{ width: 18, height: 19 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "7px",
            width: "31px",
            height: "31px",
            background: "#2A2A33",
          }}
        >
          <Box
            component="img"
            src={dextop}
            alt="group"
            sx={{ width: 17, height: 17 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "7px",
            width: "31px",
            height: "31px",
            background: "#2A2A33",
          }}
        >
          <Box
            component="img"
            src={graph}
            alt="group"
            sx={{ width: 15.5, height: 15.5 }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MenuIconSidebar;
