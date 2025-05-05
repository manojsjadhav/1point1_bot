import {
  Box,
  Card,
  CardContent,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { ChangeEvent } from "react";
import "./agentCustomNode.scss";

const AgentCustomNode = (props: any) => {
  console.log({ props });
  const { id, data, setData } = props;
  const { setNodes } = useReactFlow();
  if (!data) return <div style={{ color: "white" }}>No data</div>;

  const handleInputChange = (event: any) => {
    setNodes((nodes) =>
      nodes.map((node: any) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                fields: node.data.fields.map((field: any) =>
                  field.name === event.target.name
                    ? { ...field, value: event.target.value }
                    : field
                ),
              },
            }
          : node
      )
    );
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setData({
        ...data,
        fields: data.fields.map((field: any) =>
          field.label === event.target.name
            ? { ...field, value: event.target.files![0] }
            : field
        ),
      });
      console.log("Uploaded file:", event.target.files?.[0]);
    }
  };

  const renderField = (field: any, index: number) => {
    const labelWithIcon = (
      <Box display="flex" alignItems="center" gap={0.5}>
        <span style={{ fontFamily: "GeneralSans-m", fontSize: "12px" }}>
          {field.label}
        </span>
        {field.infoIcon && (
          <Box
            component="img"
            src={field.infoIcon}
            alt={field.label}
            sx={{ width: 22, height: 22 }}
          />
        )}
      </Box>
    );

    const baseTextFieldStyles = {
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
      height: "36px",
      fontFamily: "GeneralSans-m",
      fontSize: "12px",
      lineHeightStep: "18px",
    };
    const sliderStyles = {
      color: "#FF581C",
      height: 4,
      "& .MuiSlider-track": {
        height: 4,
      },
      "& .MuiSlider-rail": {
        height: 4,
        opacity: 0.3,
      },
      "& .MuiSlider-thumb": {
        width: 11,
        height: 11,
        backgroundColor: "#FF581C",
        border: "1px solid white",
        "&:hover, &.Mui-focusVisible, &.Mui-active": {
          boxShadow: "0 0 0 6px rgba(255, 88, 28, 0.16)",
        },
      },
    };

    return (
      <Box sx={{ flex: 1 }} key={index}>
        <Typography
          variant="body2"
          component="div"
          sx={{
            mb: "4px",
            fontFamily: "GeneralSans-m",
            fontSize: "14px",
            lineHeight: "20px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {labelWithIcon}
        </Typography>
        {field.type === "text" && (
          <TextField
            fullWidth
            variant="outlined"
            placeholder={field.placeholder}
            size="small"
            sx={baseTextFieldStyles}
            name={field.name}
            label={field.lable}
            value={field.value}
            onChange={handleInputChange}
          />
        )}
        {field.type === "select" && (
          <select
            id={`${field.name}-select`}
            name={field.name}
            value={String(field.value)}
            onChange={handleInputChange}
            className="custom-select"
          >
            <option value="" disabled>
              {field.placeholder || "Select an option"}
            </option>
            {field.options?.map((option: any) => (
              <option key={option} value={option}>
                {String(option)}
              </option>
            ))}
          </select>
        )}
        {field.type === "textarea" && (
          <TextField
            fullWidth
            multiline
            minRows={3}
            variant="outlined"
            placeholder={field.placeholder}
            value={field.value}
            size="small"
            sx={{ ...baseTextFieldStyles, mb: "50px" }}
            name={field.name}
            onChange={handleInputChange}
          />
        )}
        {field.type === "slider" && (
          <Box
            className="nodrag"
            sx={{ width: "100%" }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Slider
              name={field.name  }
              value={field.value}
              onChange={handleInputChange}
              aria-labelledby="input-slider"
              sx={sliderStyles}
            />
          </Box>
        )}

        {field.type === "file" && (
          <>
            <input
              type="file"
              id={`upload-${index}`}
              style={{ display: "none" }}
              name={field.label}
              onChange={handleFileChange}
            />

            <label htmlFor={`upload-${index}`}>
              <Box
                sx={{
                  width: "100%",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #41414B",
                  borderRadius: "8px",
                  background: "#2A2A33",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "#FF581C",
                  },
                }}
              >
                <Box
                  component="img"
                  src={field.fileIcon}
                  alt="upload"
                  sx={{ width: 20, height: 20 }}
                />
              </Box>
            </label>

            <Typography
              sx={{
                mt: "4px",
                fontSize: "12px",
                fontFamily: "GeneralSans-m",
                color: "#B8B9C1",
                textAlign: "center",
              }}
            >
              {field.message}
            </Typography>
          </>
        )}
      </Box>
    );
  };

  return (
    <Card
      sx={{
        backgroundColor: "#18181B",
        Width: 280,
        borderRadius: 2,
        boxShadow: 3,
        color: "#FFF",
        border: "1px solid #2A2A33",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: "12px",
            px: "12px",
          }}
        >
          {data.nodeIcon && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                mb: "8px",
              }}
            >
              <Box
                component="img"
                src={data.nodeIcon}
                alt={data.label}
                sx={{ width: 24, height: 24 }}
              />
              <Typography
                sx={{
                  fontFamily: "GeneralSans-m",
                  fontSize: "14px",
                  color: "#fff",
                }}
              >
                {data.title}
              </Typography>
            </Box>
          )}
          <Box>
            <Box
              component="img"
              src={data.playIcon}
              alt={data.label}
              sx={{
                width: 24,
                height: 24,
                color: data.isActive ? "#F7F7F8" : "",
              }}
            />
          </Box>
        </Box>
        <Typography
          sx={{
            mb: "13px",
            px: "12px",
            fontFamily: "GeneralSans-r",
            fontSize: "12px",
            color: "#B8B9C1",
          }}
        >
          {data.description}
        </Typography>
        <Box sx={{ border: "1px solid #2A2A33" }}></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            px: "12px",
          }}
        >
          {data.fields?.map(renderField)}
        </Box>

        {data.bottom && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: "16px",
              px: "12px",
              pt: "3px",
              background: "#2A2A33",
              height: "36px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                mb: "8px",
              }}
            >
              <Box
                component="img"
                src={data.bottom.icons[0]}
                alt={data.label}
                sx={{ width: 24, height: 24 }}
              />
              <Typography
                sx={{
                  fontFamily: "GeneralSans-m",
                  fontSize: "12px",
                  color: "#fff",
                }}
              >
                {data.bottom.text}
              </Typography>
            </Box>
            <Box>
              <Box
                component="img"
                src={data.bottom.icons[1]}
                alt={data.label}
                sx={{ width: 24, height: 24, color: "#fff" }}
              />
            </Box>
          </Box>
        )}
      </CardContent>

      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: "#FF581C",
          width: 8,
          height: 8,
          borderRadius: "50%",
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "#FF581C",
          width: 8,
          height: 8,
          borderRadius: "50%",
        }}
      />
    </Card>
  );
};

export default AgentCustomNode;
