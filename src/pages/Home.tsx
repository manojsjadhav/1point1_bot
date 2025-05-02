import { Box, Typography } from "@mui/material";
import onepointone from "../assets/onepointone.svg";
import api from "../assets/api.svg";
import visualbuilder from "../assets/visualbuilder.svg";
import share from "../assets/share.svg";
import Globe from "../assets/Globe.svg";
import chevrondown from "../assets/chevron-down.svg";
import LoginForm from "../components/LoginForm";
// import RegisterPage from "../components/RegisterPage.tsx";
// import LoginPage from "../components/LoginPage.tsx";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          px: "82px",
          py: "124px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: 400,
            height: 628,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between ",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Box>
                <Box
                  component="img"
                  src={onepointone}
                  alt="Onepointone logo"
                  sx={{ width: 121, height: 38 }}
                />
              </Box>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: "24px",
                  fontFamily:"GeneralSans-m",
                  lineHeight: "32px",
                }}
              >
                Launch AI-Powered workflows without a code
              </Typography>
            </Box>
            <Box>
              <Box
                component="img"
                src={visualbuilder}
                alt="Onepointone logo"
                sx={{ width: 32, height: 32 }}
              />
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: "16px",
                  fontFamily: "GeneralSans-m",
                  lineHeight: "24px",
                }}
              >
                Visual Builder for AI Workflows
              </Typography>
              <Typography
                sx={{
                  color: "#D9D9DE",
                  fontSize: "14px",
                  fontFamily: "GeneralSans-r",
                  lineHeight: "20px",
                }}
              >
                Design smart agents with a drag-and-drop interface. Test
                instantly in the cloud or self-host anytime.
              </Typography>
            </Box>
            <Box>
              <Box
                component="img"
                src={share}
                alt="Onepointone logo"
                sx={{ width: 32, height: 32 }}
              />
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: "16px",
                  fontFamily: "GeneralSans-m",
                  lineHeight: "24px",
                }}
              >
                The Easiest Way to Build and Share AI Tools
              </Typography>
              <Typography
                sx={{
                  color: "#D9D9DE",
                  fontSize: "14px",
                  fontFamily: "4GeneralSans-r",
                  lineHeight: "20px",
                }}
              >
                Craft advanced chatbots, smart agents, and RAG-powered apps in
                just a few clicks, low-code platform built on Python.
              </Typography>
            </Box>
            <Box>
              <Box
                component="img"
                src={api}
                alt="Onepointone logo"
                sx={{ width: 32, height: 32 }}
              />
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: "16px",
                  fontFamily: "GeneralSans-m",
                  lineHeight: "24px",
                }}
              >
                Ready-to-Use Blocks for Any Data or API{" "}
              </Typography>
              <Typography
                sx={{
                  color: "#D9D9DE",
                  fontSize: "14px",
                  fontFamily: "GeneralSans-r",
                  lineHeight: "20px",
                }}
              >
                Seamlessly integrate AI models, APIs, or databases using our
                library of modular components, and launch instantly.{" "}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{
                color: "#B8B9C1",
                fontFamily: "GeneralSans-r",
                fontSize: "12px",
                display: "flex",
                width: "252px",
                gap: "14px",
              }}
            >
              <Typography>• Terms</Typography>
              <Typography>• Privacy</Typography>
              <Typography>• Doc</Typography>
              <Typography>• Help</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "106px",
                height: "36px",
                justifyContent: "space-between",
                px: "2px",
              }}
            >
              <Box
                component="img"
                src={Globe}
                alt="Onepointone logo"
                sx={{ width: 24, height: 24 }}
              />
              <Typography sx={{ color: "#B8B9C1", fontFamily: "GeneralSans-m" }}>
                English
              </Typography>
              <Box
                component="img"
                src={chevrondown}
                alt="Onepointone logo"
                sx={{ width: 24, height: 24 }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            color: "white",
            width: 547,
          }}
        >
            <LoginForm  />
        </Box>
      </Box>
    </>
  );
};
export default Home;
