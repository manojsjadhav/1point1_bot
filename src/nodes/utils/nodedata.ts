import Chatgpt from "../../assets/componentmenuicon/Chatgpt.svg";
import Deepgram from "../../assets/componentmenuicon/Deepgram.svg";
import play from "../../assets/componentmenuicon/play.svg";
import Show from "../../assets/componentmenuicon/Show.svg";
import Info from "../../assets/componentmenuicon/Info.svg";
import Note_Search from "../../assets/componentmenuicon/Note_Search.svg";
import Google_TTS from "../../assets/componentmenuicon/Google_TTS.svg";
import Upload from "../../assets/componentmenuicon/Upload.svg";
import axios from "axios";

export const addflowModels = async () => {
  try {
    const response = await axios.get(
      "http://1msg.1point1.in:3001/api/auth/j-v1/user_req/"
    );
    console.log("call api:", response);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

const fetchModelParameters = async () => {
  try {
    const response = await axios.get(
      "http://1msg.1point1.in:3001/api/auth/j-v1/model_parameters/",
      { params: { model_id: 1 } }
    );

    const fieldArr: any[] = [];

    (response.data?.model_parameters || []).forEach((item: any) => {
      const name = item.parameter_name.replace(/\s+/g, "_").toLowerCase();
      const baseField = {
        type: item.input_type,
        label: item.parameter_name,
        placeholder: "Type something",
        name,
        value: "",
      };

      if (item.input_type === "select") {
        fieldArr.push({
          ...baseField,
          options: item.select_values || ["Linear16", "gpt-4", "gemini"],
        });
      } else {
        fieldArr.push(baseField);
      }
    });
    return fieldArr;
  } catch (error) {
    console.error("Error fetching model parameters:", error);
  }
};

export const DeepgramNode = {
  nodetype: "speech_to_text",
  type: "custom",
  position: { x: 50, y: 50 },
  data: {
    nodeIcon: Deepgram,
    title: "Deepgram",
    description: "Generates text using Deepgram LLMs.",
    playIcon: play,
    // fields: fetchModelParameters(),
    fields: [
      {
        type: "text",
        label: "API Key",
        infoIcon: Info,
        placeholder: "Type something",
        name: "apikey",
        value: "",
      },
      {
        type: "select",
        label: "Encoding",
        name: "encoding",
        value: "Linear16",
        options: ["Linear16", "gpt-4", "gemini"],
      },
      {
        type: "select",
        label: "Sample Rate",
        name: "sample_rate",
        options: ["8000", "7000", "6000"],
        value: "8000",
      },
      {
        type: "select",
        label: "End Pointing",
        name: "endpointing",
        options: ["1000", "700", "500"],
        value: "1000",
      },
      {
        type: "select",
        label: "Model",
        name: "model",
        options: ["Nova-2", "gpt-4", "gemini"],
        value: "Nova-2",
      },
      {
        type: "select",
        label: "Interim Results",
        name: "interim_results",
        options: [true, false],
        value: true,
      },
      {
        type: "select",
        label: "Smart Format",
        name: "smart_format",
        options: [true, false],
        value: true,
      },
    ],
    bottom: {
      icons: [Note_Search, Show],
      text: "Speech to Text Model",
    },
  },
  selected: true,
};
const OpenAINode = {
  nodetype: "llm_models",
  type: "custom",
  position: { x: 400, y: 100 },
  data: {
    nodeIcon: Chatgpt,
    title: "Open AI",
    description: "Generates text using OpenAI LLMs.",
    playIcon: play,
    fields: [
      {
        type: "text",
        label: "API Key",
        infoIcon: Info,
        name: "apikey",
        placeholder: "Type something",
        value: "",
      },
      {
        type: "select",
        label: "Model",
        name: "model",
        options: ["Linear16", "gpt-4", "gemini"],
        value: "Linear16",
      },
      {
        type: "textarea",
        label: "System Prompt",
        name: "system_prompt",
        placeholder: "Type something",
        infoIcon: Info,
        value: "",
      },
      {
        type: "file",
        label: "Train by Document",
        name: "document_url",
        message: "Upload the document in .pdf, .doc format.",
        fileIcon: Upload,
        value: "",
      },
    ],
    bottom: {
      icons: [Note_Search, Show],
      text: "Language Learning Model",
    },
  },
};
const GoogleTTSNode = {
  nodetype: "text_to_speech",
  type: "custom",
  position: { x: 750, y: 150 },
  data: {
    nodeIcon: Google_TTS,
    title: "Google TTS",
    description: "Generates speech using Google TTS.",
    playIcon: play,
    fields: [
      {
        type: "select",
        label: "Select Language",
        name: "language",
        infoIcon: Info,
        options: ["English(United States)", "Hindi", "English"],
        value: "English(United States)",
      },
      {
        type: "select",
        label: "Audio Device Profile",
        name: "audio_device_profile",
        infoIcon: Info,
        options: ["jhdag", "Hindi", "English"],
        value: "jhdag",
      },
      {
        type: "select",
        label: "Voice",
        name: "voice",
        options: ["male", "female", "other"],
        value: "male",
      },
      {
        type: "slider",
        label: "Speed",
        infoIcon: Info,
        name: "speed",
        value: 50,
      },
      {
        type: "slider",
        label: "Pitch",
        name: "pitch",
        infoIcon: Info,
        value: 50,
      },
    ],
    bottom: {
      icons: [Note_Search, Show],
      text: "Text to Speech",
    },
  },
};

export const getCurrentFormattedDate = (): string => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 0-based
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const nodeListData = [OpenAINode, DeepgramNode, GoogleTTSNode];
