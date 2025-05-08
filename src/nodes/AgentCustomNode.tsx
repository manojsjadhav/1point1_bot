import {
  Box,
  Card,
  CardContent,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import "./agentCustomNode.scss";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { agentStore } from "../providers/AgentContext";
import Openview from "../assets/componentmenuicon/Open_view.svg";
import TextareaPopup from "../components/agentcreation/TextareaPopup";

const AgentCustomNode = (props: any) => {
  const { id, data } = props;
  const [isFocused, setIsFocused] = useState<any>(false);
  const [openTextarea, setOpenTextarea] = useState<any>(false);
  const { agentDetails } = useContext(agentStore);
  console.log({ data });
  const { setNodes } = useReactFlow();
  const handleTextareaOpen = () => {
    setOpenTextarea(true);
  };
  const handleTextareaClose = () => {
    setOpenTextarea(false);
  };
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
  const handleFileUpload = async (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        "http://1msg.1point1.in:3001/api/auth/j-v1/upload-file/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const fileUrl = res.data?.file_url;
      if (fileUrl) {
        console.log({ fileUrl });
        setNodes((nodes) =>
          nodes.map((node: any) =>
            node.id === id
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    fields: node.data.fields.map((field: any) =>
                      field.name === event.target.name
                        ? { ...field, value: fileUrl }
                        : field
                    ),
                  },
                }
              : node
          )
        );
      } else {
        console.error("data.fields is not an array");
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };
  useEffect(() => {
    if (agentDetails.system_prompt) {
      setNodes((nodes) =>
        nodes.map((node: any) =>
          node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  fields: node.data.fields.map((field: any) =>
                    field.name === "system_prompt"
                      ? { ...field, value: agentDetails.system_prompt }
                      : field
                  ),
                },
              }
            : node
        )
      );
    }
  }, []);

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
        {/* {field.type === "textarea" && (
          <textarea
            value={field.value}
            name={field.name}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type something..."
            style={{
              height: "100px",
              width: "100%",
              boxSizing: "border-box",
              paddingBottom: "5px",
              fontFamily: "GeneralSans-m",
              fontSize: "10px",
              border: `1px solid ${isFocused ? "#FF581C" : "#41414B"}`,
              borderRadius: "8px",
              background: "#2A2A33",
              color: "#fff",
              padding: "8px",
              resize: "none",
              overflow: "auto",
            }}
          />
        )} */}
        {field.type === "textarea" && (
          <Box sx={{ position: "relative", width: "100%" }}>
            <textarea
              value={field.value}
              name={field.name}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Type something..."
              style={{
                height: "100px",
                width: "100%",
                boxSizing: "border-box",
                padding: "8px",
                fontFamily: "GeneralSans-m",
                fontSize: "10px",
                border: `1px solid ${isFocused ? "#FF581C" : "#41414B"}`,
                borderRadius: "8px",
                background: "#2A2A33",
                color: "#fff",
                resize: "none",
                overflow: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            />
            <Box
              component="img"
              src={Openview}
              alt="play"
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                width: 24,
                height: 24,
                cursor: "pointer",
              }}
              onClick={handleTextareaOpen}
            />
            <TextareaPopup
              openTextarea={openTextarea}
              handleTextareaClose={handleTextareaClose}
              value={field.value}
              name={field.name}
              handleInputChange={handleInputChange}
            />
          </Box>
        )}
        {field.type === "slider" && (
          <Box
            className="nodrag"
            sx={{ width: "100%" }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Slider
              name={field.name}
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
              name={field.name}
              onChange={handleFileUpload}
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
          {console.log({ data })}
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
