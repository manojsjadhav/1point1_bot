import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

// import your assets
import Data from "../../assets/Data.svg";
import Embedding from "../../assets/Embedding.svg";
import Intelligence from "../../assets/Intelligence.svg";
import Prompts from "../../assets/Prompts.svg";
import Speech from "../../assets/Speech.svg";
import Text from "../../assets/Text.svg";
import Vector_stores from "../../assets/Vector_stores.svg";
import Download from "../../assets/Download.svg";
import Upload from "../../assets/Upload.svg";
import Right_arrow from "../../assets/Right_arrow.svg";
import chevrondown from "../../assets/chevron-down.svg";
import Aws_Polly from "../../assets/componentmenuicon/Aws_Polly.svg";
import Deepgram from "../../assets/componentmenuicon/Deepgram.svg";
import Chatgpt from "../../assets/componentmenuicon/Chatgpt.svg";
import Drag from "../../assets/componentmenuicon/Drag.svg";
import Gemini from "../../assets/componentmenuicon/Gemini.svg";
import Google_TTS from "../../assets/componentmenuicon/Google_TTS.svg";
import Huggingface from "../../assets/componentmenuicon/Huggingface.svg";
import Local_Model from "../../assets/componentmenuicon/Local_Model.svg";
import {
  DeepgramNode,
  GoogleTTSNode,
  OpenAINode,
} from "../../nodes/utils/nodedata";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addNode } from "../../redux/nodeSlice/nodeSlice";

// initial static menu items
const initialMenuItems = [
  {
    id: 1,
    startIcon: Download,
    label: "Input",
    endCloseIcon: Right_arrow,
    endOpenIcon: chevrondown,
    isActive: false,
    subMenuItems: [],
  },
  {
    id: 2,
    startIcon: Upload,
    label: "Output",
    endCloseIcon: Right_arrow,
    endOpenIcon: chevrondown,
    isActive: false,
    subMenuItems: [],
  },
  {
    id: 3,
    startIcon: Prompts,
    label: "Prompts",
    endCloseIcon: Right_arrow,
    endOpenIcon: chevrondown,
    isActive: false,
    subMenuItems: [],
  },
  {
    id: 4,
    startIcon: Data,
    label: "Data",
    endCloseIcon: Right_arrow,
    endOpenIcon: chevrondown,
    isActive: false,
    subMenuItems: [],
  },
  {
    id: 5,
    startIcon: Speech,
    label: "Speech to Text",
    endCloseIcon: Right_arrow,
    endOpenIcon: chevrondown,
    isActive: false,
    subMenuItems: [{ startIcon: Deepgram, label: "Deepgram", endIcon: Drag }],
  },
  {
    id: 6,
    startIcon: Text,
    label: "Text to Speech",
    endCloseIcon: Right_arrow,
    endOpenIcon: chevrondown,
    isActive: false,
    subMenuItems: [
      { startIcon: Google_TTS, label: "Google TTS", endIcon: Drag },
      { startIcon: Aws_Polly, label: "AWS Polly", endIcon: Drag },
    ],
  },
  {
    id: 7,
    startIcon: Intelligence,
    label: "LLM Models",
    endCloseIcon: Right_arrow,
    endOpenIcon: chevrondown,
    isActive: false,
    subMenuItems: [
      { startIcon: Chatgpt, label: "Open AI", endIcon: Drag },
      { startIcon: Gemini, label: "Gemini", endIcon: Drag },
      { startIcon: Huggingface, label: "Huggingface", endIcon: Drag },
      { startIcon: Local_Model, label: "Language Model", endIcon: Drag },
    ],
  },
  {
    id: 8,
    startIcon: Embedding,
    label: "Embedding Model",
    endCloseIcon: Right_arrow,
    endOpenIcon: chevrondown,
    isActive: false,
    subMenuItems: [],
  },
  {
    id: 9,
    startIcon: Vector_stores,
    label: "Vector Stores",
    endCloseIcon: Right_arrow,
    endOpenIcon: chevrondown,
    isActive: false,
    subMenuItems: [],
  },
];
const nodeListData = [OpenAINode, DeepgramNode, GoogleTTSNode];

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const dispatch = useDispatch();

  const toggleMenu = (id: number) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };
  const handleAddNode = (nodeName: any) => {
    const node = nodeListData.find((node: any) => node.data.title === nodeName);
    dispatch(addNode({ ...node, id: uuidv4() }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {menuItems.map((menu) => (
        <React.Fragment key={menu.id}>
          <Box
            onClick={() => toggleMenu(menu.id)}
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "40px",
              px: 1.5,
              backgroundColor: menu.isActive ? "#2A2A33" : "transparent",
              border: menu.isActive
                ? "1px solid #FF581C"
                : "1px solid transparent",
              borderRadius: "6px",
              transition: "all 0.3s",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Box
                component="img"
                src={menu.startIcon}
                alt={menu.label}
                sx={{
                  width: 24,
                  height: 24,
                  color: menu.isActive ? "#F7F7F8" : "",
                }}
              />
              <Typography
                sx={{
                  fontFamily: "GeneralSans-m",
                  fontSize: "14px",
                  color: menu.isActive ? "#F7F7F8" : "#B8B9C1",
                }}
              >
                {menu.label}
              </Typography>
            </Box>
            <Box
              component="img"
              src={menu.isActive ? menu.endOpenIcon : menu.endCloseIcon}
              alt="toggle"
              sx={{
                width: 24,
                height: 24,
                color: menu.isActive ? "#F7F7F8" : "",
              }}
            />
          </Box>

          {/* Submenu */}
          {menu.isActive && menu.subMenuItems.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {menu.subMenuItems.map((sub, i) => (
                <Box
                  key={i}
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "40px",
                    px: 1.5,
                    backgroundColor: "#2A2A33",
                    borderRadius: "6px",
                  }}
                  onClick={() => handleAddNode(sub.label)}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <Box
                      component="img"
                      src={sub.startIcon}
                      alt={sub.label}
                      sx={{
                        width: 24,
                        height: 24,
                        color: menu.isActive ? "#F7F7F8" : "",
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "GeneralSans-m",
                        fontSize: "14px",
                        color: menu.isActive ? "#F7F7F8" : "#B8B9C1",
                      }}
                    >
                      {sub.label}
                    </Typography>
                  </Box>
                  <Box
                    component="img"
                    src={sub.endIcon}
                    alt="drag"
                    sx={{
                      width: 24,
                      height: 24,
                      color: menu.isActive ? "#F7F7F8" : "",
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default MenuItems;
