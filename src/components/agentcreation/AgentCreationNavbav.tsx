import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Breadcrumbs,
  Link,
} from "@mui/material";
import onepointone from "../../assets/onepointone.svg";
import account from "../../assets/account.svg";
import Book from "../../assets/Book.svg";
import LogOut from "../../assets/Log_Out.svg";
import Integrations from "../../assets/Integrations.svg";
import Headphones from "../../assets/Headphones2.svg";
import chevrondown from "../../assets/chevron-down.svg";
import setting from "../../assets/setting.svg";
import notification from "../../assets/notification.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/nodeSlice/authSlice";
import { toast } from "react-toastify";
import { authStore } from "../../providers/AuthContext";

const AgentCreationNavban = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { tokenToggle, setTokenToggle } = useContext(authStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const links = useSelector((state: RootState) => state.breadcrumb.links);
  const handleMenuOpenIcon = () => {
    setOpenMenu((prev) => !prev);
  };
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    handleMenuOpenIcon();
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMenuOpenIcon();
  };

  const handleLogout = () => {
    dispatch(logout());
    setTokenToggle(!tokenToggle);
    toast.success("User Logout Successfully.");
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#18181B",
        height: "71px",
        borderBottom: "1px solid #41414B",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: "14px !important",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box
            component="img"
            src={onepointone}
            alt="Onepointone logo"
            sx={{ width: 71, height: 21, cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </Box>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {links.map((item: any, index: any) => {
            const isLast = index === links.length - 1;
            return isLast ? (
              <Typography
                key={index}
                color="text.primary"
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontFamily: "GeneralSans-m",
                  fontSize: "14px",
                }}
              >
                {item.label}
              </Typography>
            ) : (
              <Link
                key={index}
                underline="none"
                color="inherit"
                onClick={() => {
                  if (item.path === location.pathname) {
                    window.location.reload();
                  } else {
                    navigate(item.path);
                  }
                }}
                sx={{
                  cursor: "pointer",
                  color: "#B8B9C1",
                  textTransform: "none",
                  fontFamily: "GeneralSans-m",
                  fontSize: "14px",
                }}
              >
                {item.label} /
              </Link>
            );
          })}
        </Breadcrumbs>
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Box>
            <IconButton sx={{ color: "#fff" }}>
              <Box
                component="img"
                src={notification}
                alt="Notifications"
                sx={{ width: 27, height: 27 }}
              />
            </IconButton>
            <IconButton sx={{ color: "#fff" }}>
              <Box
                component="img"
                src={setting}
                alt="Notifications"
                sx={{ width: 27, height: 27 }}
              />
            </IconButton>
          </Box>
          <IconButton onClick={handleMenuOpen}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src="/profile.jpg" sx={{ width: 28.5, height: 28.5 }} />
              {openMenu ? (
                <Box
                  component="img"
                  src={chevrondown}
                  alt="Collapse"
                  sx={{ width: 20, height: 20 }}
                />
              ) : (
                <Box
                  component="img"
                  src={chevrondown}
                  alt="Expand"
                  sx={{ width: 20, height: 20 }}
                />
              )}
            </Box>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: "#2A2A33",
                  border: "1px silod #41414B",
                  width: "221px",
                  overflow: "visible",
                  p: 0,
                },
              },
              list: {
                sx: {
                  p: 0,
                },
              },
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <MenuItem
                sx={{
                  px: "12px",
                  py: "14px",
                  background: "#41414B",
                  borderTopLeftRadius: "7px",
                  borderTopRightRadius: "7px",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Avatar
                    src="/profile.jpg"
                    alt="Profile"
                    sx={{ width: 44, height: 44 }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box
                      sx={{
                        display: "flex",
                        height: "20px",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "#fff",
                          fontFamily: "GeneralSans-m",
                          fontSize: "14px",
                        }}
                      >
                        John Doe
                      </Typography>
                      <Box
                        sx={{
                          height: "14px",
                          px: "6px",
                          background: "#FF581C",
                          borderRadius: "100px",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "bold",

                            color: "#fff",
                            fontFamily: "GeneralSans-m",
                            fontSize: "8px",
                          }}
                        >
                          Admin
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#fff",
                        fontFamily: "GeneralSans-r",
                        fontSize: "12px",
                      }}
                    >
                      johndoe@1point1.com
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
              <MenuItem sx={{ px: "12px", height: "24px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Box
                    component="img"
                    src={account}
                    alt="Settings"
                    sx={{ width: 22, height: 24 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "GeneralSans-m",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  >
                    Account
                  </Typography>
                </Box>
              </MenuItem>

              <MenuItem sx={{ px: "12px", height: "24px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Box
                    component="img"
                    src={Integrations}
                    alt="Settings"
                    sx={{ width: 22, height: 24 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "GeneralSans-m",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  >
                    Integrations
                  </Typography>
                </Box>
              </MenuItem>
              <Box sx={{ border: "1px solid #41414B", width: "100%" }} />
              <MenuItem sx={{ px: "12px", height: "24px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Box
                    component="img"
                    src={Book}
                    alt="Settings"
                    sx={{ width: 22, height: 24 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "GeneralSans-m",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  >
                    Guide
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem sx={{ px: "12px", height: "24px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Box
                    component="img"
                    src={Headphones}
                    alt="Settings"
                    sx={{ width: 22, height: 24 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "GeneralSans-m",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  >
                    Help Center
                  </Typography>
                </Box>
              </MenuItem>
              <Box sx={{ border: "1px solid #41414B", width: "100%" }} />
              <MenuItem sx={{ px: "12px", height: "24px", mb: "8px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Box
                    component="img"
                    src={LogOut}
                    alt="Settings"
                    sx={{ width: 22, height: 24 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "GeneralSans-m",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </Typography>
                </Box>
              </MenuItem>
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AgentCreationNavban;
