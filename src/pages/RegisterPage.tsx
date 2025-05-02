import { Box } from "@mui/material";
import AuthContentPage from "../components/AuthContentPage.tsx";
import RegisterForm from "../components/RegisterForm.tsx";
import bgImage from "../assets/bg.png";

const RegisterPage = () => {
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
            <RegisterForm />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default RegisterPage;
