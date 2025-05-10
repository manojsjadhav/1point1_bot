// components/CustomLoader.tsx
import { CircularProgress, Box } from "@mui/material";

const CustomLoader = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0e0e10",
        width: "100%",
      }}
    >
      <CircularProgress
        size={60}
        thickness={5}
        sx={{
          color: "#FF5722",
        }}
      />
    </Box>
  );
};

export default CustomLoader;
