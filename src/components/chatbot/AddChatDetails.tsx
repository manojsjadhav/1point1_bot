import { Box, Typography, Button } from "@mui/material";
import Mail from "../../assets/Mail.svg";
import User_Add from "../../assets/User_Add.svg";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addChatDetailsValidationSchema } from "../../utils/validation/authvalidation";
import FormikTextField from "../FormikTextField";
import axios from "axios";

const AddChatDetails = ({ setOpenForm }: any) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      agent_id: id,
      first_name: "",
      email: "",
      phone_number: "",
    },
    validationSchema: addChatDetailsValidationSchema,
    onSubmit: async (values: any) => {
      try {
        await axios.post(
          "http://1msg.1point1.in:3001/api/chat/bot/create/contact/",
          values
        );
        toast.success("Add chat details succssesfully.");
        formik.resetForm();
        setOpenForm(true);
      } catch (error: any) {
        console.error("Add chat Details Error:", error.message);
      }
    },
  });

  return (
    <Box
      sx={{
        height: "100%",
        background: "#18181b",
        display: "flex",
        justifyContent: "center",
        borderLeft: "1px solid #41414b",
      }}
    >
      <Box
        sx={{
          background: "#41414B",
          py: "34px",
          px: "28px",
          borderRadius: "12px",
          width: "480px",
          mt: "100px",
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
          Add Details to chat
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", gap: "14px", flexDirection: "column" }}>
            <FormikTextField
              name="first_name"
              label="Name"
              placeholder="Name"
              icon={User_Add}
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.first_name}
              touched={formik.touched.first_name}
            />
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
            <FormikTextField
              name="phone_number"
              label=" Phone"
              placeholder=" Phone"
              icon={Mail}
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.phone_number}
              touched={formik.touched.phone_number}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                borderRadius: "8px",
                py: "8px",
                background: "#FF581C",
                fontFamily: "GeneralSans-m",
                fontSize: "14px",
                textTransform: "none",
              }}
              type="submit"
            >
              Start
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddChatDetails;
