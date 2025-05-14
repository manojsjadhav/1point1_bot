import {
  Box,
  FormHelperText,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

const FormikTextField = ({
  touched,
  error,
  onBlur,
  onChange,
  value,
  icon,
  placeholder,
  label,
  name,
}: any) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography
        variant="body2"
        sx={{
          mb: "4px",
          fontFamily: "GeneralSans-m",
          fontSize: "14px",
          lineHeight: "20px",
          color: "#fff",
        }}
      >
        {label}
      </Typography>
      <TextField
        variant="outlined"
        placeholder={placeholder}
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
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={touched && Boolean({ error })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box
                component="img"
                src={icon}
                alt="User Icon"
                sx={{ width: 24, height: 24 }}
              />
            </InputAdornment>
          ),
        }}
      />
      {touched && typeof error === "string" && (
        <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>
      )}
    </Box>
  );
};

export default FormikTextField;
