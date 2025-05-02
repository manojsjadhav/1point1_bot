import { Box } from "@mui/material";
import AuthContentPage from "../components/AuthContentPage.tsx";
import LoginForm from "../components/LoginForm.tsx";
import bgImage from "../assets/bg.png";

const LoginPage = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            px: "82px",
            py: "124px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <AuthContentPage />
          <Box
            sx={{
              color: "white",
              width: 547,
            }}
          >
            <LoginForm />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default LoginPage;
