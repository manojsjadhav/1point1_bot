import Chatgpt from "../../assets/componentmenuicon/Chatgpt.svg";
import Deepgram from "../../assets/componentmenuicon/Deepgram.svg";
import play from "../../assets/componentmenuicon/play.svg";
import Show from "../../assets/componentmenuicon/Show.svg";
import Info from "../../assets/componentmenuicon/Info.svg";
import Note_Search from "../../assets/componentmenuicon/Note_Search.svg";
import Google_TTS from "../../assets/componentmenuicon/Google_TTS.svg";
import Upload from "../../assets/componentmenuicon/Upload.svg";
import { v4 as uuidv4 } from "uuid";

export const DeepgramNode = {
  id: `deepgram-node-${uuidv4()}`,
  nodetype: "speech_to_text",
  type: "custom",
  position: { x: 50, y: 50 },
  data: {
    nodeIcon: Deepgram,
    title: "Deepgram",
    description: "Generates text using Deepgram LLMs.",
    playIcon: play,
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
        options: [ true, false],
        value: true,
      },
      {
        type: "select",
        label: "Smart Format",
        name: "smart_format",
        options: [ true, false],
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
export const OpenAINode = {
  id: `openai-node-${uuidv4()}`,
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
      // {
      //   type: "select",
      //   label: "Sample Rate",
      //   options: ["8000", "gpt-4", "gemini"],
      //   value: "8000",
      // },
      // {
      //   type: "select",
      //   label: "End Pointing",
      //   options: ["gpt-3", "gpt-4", "gemini"],
      //   value: "gpt-3",
      // },
      // {
      //   type: "text",
      //   label: "Train by URL",
      //   placeholder: "Paste URL",
      //   infoIcon: Info,
      //   fieldIcon: Open_view,
      //   value: "",
      // },
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
export const GoogleTTSNode = {
  id: `googletts-node-${uuidv4()}`,
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
