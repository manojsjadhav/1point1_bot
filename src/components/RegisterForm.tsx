import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import GoogleIcon from "../assets/Google.svg";
import Github from "../assets/Github.svg";
import Gitlab from "../assets/Gitlab.png";
import Passcode from "../assets/Passcode.svg";
import Mail from "../assets/Mail.svg";
import EyeIcon from "../assets/EyeIcon.svg";
import User_Add from "../assets/User_Add.svg";
import { registerValidationSchema } from "../utils/validation/authvalidation";
import { useFormik } from "formik";
import FormikTextField from "./FormikTextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values: any) => {
      try {
        const userData = {
          ...values,
          id: uuidv4(),
        };
        // console.log({ userData });
        await axios.post(
          "http://1msg.1point1.in:3001/api/auth/j-v1/signup/",
          userData
        );
        navigate("/login");
        formik.resetForm();
      } catch (error: any) {
        console.error("Registration Error:", error.message);
      }
    },
  });

  return (
    <Box
      sx={{
        background: "#18181B",
        py: "34px",
        px: "28px",
        borderRadius: "12px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "GeneralSans-m",
          fontSize: "18px",
          lineHeight: "28px",
          color: "#fff",
          marginBottom: "16px",
        }}
        align="center"
        gutterBottom
      >
        Register to create an account
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", gap: "14px", flexDirection: "column" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormikTextField
              name="first_name"
              label=" First Name"
              placeholder=" First Name"
              icon={User_Add}
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.first_name}
              touched={formik.touched.first_name}
            />
            <FormikTextField
              name="last_name"
              label=" Last Name"
              placeholder=" Last Name"
              icon={User_Add}
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.last_name}
              touched={formik.touched.last_name}
            />
          </Box>
          <FormikTextField
            name="email"
            label=" Email"
            placeholder=" Email"
            icon={Mail}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
          />
          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: "4px",
                fontFamily: "GeneralSans-m",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              Password
            </Typography>
            <TextField
              variant="outlined"
              type={showPassword ? "text" : "password"}
              placeholder=" Password"
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  border: "1px solid #41414B",
                  borderRadius: "8px",
                  background: "#2A2A33",
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF581C",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#B8B9C1",
                },
              }}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      component="img"
                      src={Passcode}
                      alt="Passcode Icon"
                      sx={{ width: 24, height: 24 }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? (
                        <Box
                          component="img"
                          src={EyeIcon}
                          alt="Passcode Icon"
                          sx={{ width: 28, height: 36 }}
                        />
                      ) : (
                        <Box
                          component="img"
                          src={EyeIcon}
                          alt="Passcode Icon"
                          sx={{ width: 28, height: 36 }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {formik.touched.password &&
              typeof formik.errors.password === "string" && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.password}
                </FormHelperText>
              )}
            <Typography
              sx={{
                fontFamily: "GeneralSans-r",
                fontSize: "12px",
                color: "#D9D9DE",
              }}
            >
              Minimum length 8 characters
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{
              borderRadius: "8px",
              py: "6px",
              background: "#FF581C",
              fontFamily: "GeneralSans-m",
              fontSize: "14px",
              textTransform: "none",
            }}
            type="submit"
          >
            Sign Up
          </Button>
        </Box>
      </form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1, height: "1px", backgroundColor: "#ccc" }} />
          <Typography sx={{ mx: 2, color: "#999" }}>OR</Typography>
          <Box sx={{ flex: 1, height: "1px", backgroundColor: "#ccc" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            sx={{
              background: "#41414B",
              textTransform: "none",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#fff",
              width: "158px",
            }}
          >
            <Box
              component="img"
              src={GoogleIcon}
              alt="Google"
              sx={{ width: 20, height: 20 }}
            />
            Google
          </Button>

          <Button
            sx={{
              background: "#41414B",
              textTransform: "none",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#fff",
              width: "158px",
            }}
          >
            <Box
              component="img"
              src={Github}
              alt="Facebook"
              sx={{ width: 20, height: 20 }}
            />
            Github
          </Button>

          <Button
            sx={{
              background: "#41414B",
              textTransform: "none",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#fff",
              width: "158px",
            }}
          >
            <Box
              component="img"
              src={Gitlab}
              alt="Apple"
              sx={{ width: 20, height: 20 }}
            />
            Gitlab
          </Button>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: "#F7F7F8",
            fontFamily: "GeneralSans-r",
            fontSize: "12px",
            textAlign: "center",
            mt: 2,
          }}
        >
          By creating an account you agree to the{" "}
          <Box
            component="span"
            sx={{
              fontWeight: "bold",
              textDecoration: "underline",
              cursor: "pointer",
              color: "#FFFFFF",
            }}
          >
            Terms of Service
          </Box>
          .
        </Typography>
        <Typography
          variant="body2"
          sx={{
            ccolor: "#F7F7F8",
            fontFamily: "GeneralSans-r",
            fontSize: "12px",
            textAlign: "center",
            mt: 2,
          }}
        >
          Already have an account?{" "}
          <Box
            component="span"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              color: "#FF581C",
              textDecoration: "none",
            }}
            onClick={() => navigate("/login")}
          >
            Log In
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
