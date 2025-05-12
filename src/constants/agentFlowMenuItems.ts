import Data from "../assets/Data.svg";
import Embedding from "../assets/Embedding.svg";
import Intelligence from "../assets/Intelligence.svg";
import Prompts from "../assets/Prompts.svg";
import Speech from "../assets/Speech.svg";
import Text from "../assets/Text.svg";
import Vector_stores from "../assets/Vector_stores.svg";
import Download from "../assets/Download.svg";
import Upload from "../assets/Upload.svg";
import Right_arrow from "../assets/Right_arrow.svg";
import chevrondown from "../assets/chevron-down.svg";

export const groupedByTypes = (menuData: any) => {
  const groupedByType = (menuData || []).reduce((acc: any, model: any) => {
    const type = model.model_type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(model);
    return acc;
  }, {});
  return groupedByType;
};

export const agentFlowMenuItems = (subNemus: any) => {
  const menuItems: any = [
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
      subMenuItems: subNemus.STT,
    },
    {
      id: 6,
      startIcon: Text,
      label: "Text to Speech",
      endCloseIcon: Right_arrow,
      endOpenIcon: chevrondown,
      isActive: false,
      subMenuItems: subNemus.TTS,
    },
    {
      id: 7,
      startIcon: Intelligence,
      label: "LLM Models",
      endCloseIcon: Right_arrow,
      endOpenIcon: chevrondown,
      isActive: false,
      //   subMenuItems: [
      //     { startIcon: Chatgpt, label: "Open AI", endIcon: Drag },
      //     { startIcon: Gemini, label: "Gemini", endIcon: Drag },
      //     { startIcon: Huggingface, label: "Huggingface", endIcon: Drag },
      //     { startIcon: Local_Model, label: "Language Model", endIcon: Drag },
      //   ],
      subMenuItems: subNemus.LLM,
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
  return menuItems;
};

export const chatAgentFlowMenuItems = (subNemus: any) => {
  const menuItems: any = [
    {
      id: 7,
      startIcon: Intelligence,
      label: "LLM Models",
      endCloseIcon: Right_arrow,
      endOpenIcon: chevrondown,
      isActive: false,
      subMenuItems: subNemus.LLM,
    },
  ];
  return menuItems;
};
