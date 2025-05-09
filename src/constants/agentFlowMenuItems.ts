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
import Aws_Polly from "../assets/componentmenuicon/Aws_Polly.svg";
import Deepgram from "../assets/componentmenuicon/Deepgram.svg";
import Chatgpt from "../assets/componentmenuicon/Chatgpt.svg";
import Drag from "../assets/componentmenuicon/Drag.svg";
import Gemini from "../assets/componentmenuicon/Gemini.svg";
import Google_TTS from "../assets/componentmenuicon/Google_TTS.svg";
import Huggingface from "../assets/componentmenuicon/Huggingface.svg";
import Local_Model from "../assets/componentmenuicon/Local_Model.svg";

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
      //   subMenuItems: [{ startIcon: Deepgram, label: "Deepgram", endIcon: Drag }],
      subMenuItems: subNemus.STT,
    },
    {
      id: 6,
      startIcon: Text,
      label: "Text to Speech",
      endCloseIcon: Right_arrow,
      endOpenIcon: chevrondown,
      isActive: false,
      //   subMenuItems: [
      //     { startIcon: Google_TTS, label: "Google TTS", endIcon: Drag },
      //     { startIcon: Aws_Polly, label: "AWS Polly", endIcon: Drag },
      //   ],
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
