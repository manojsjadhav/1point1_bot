import Chatgpt from "../../assets/componentmenuicon/Chatgpt.svg";
import Deepgram from "../../assets/componentmenuicon/Deepgram.svg";
import play from "../../assets/componentmenuicon/play.svg";
import Show from "../../assets/componentmenuicon/Show.svg";
import Info from "../../assets/componentmenuicon/Info.svg";
import Open_view from "../../assets/componentmenuicon/Open_view.svg";
import Note_Search from "../../assets/componentmenuicon/Note_Search.svg";
import Google_TTS from "../../assets/componentmenuicon/Google_TTS.svg";
import Upload from "../../assets/componentmenuicon/Upload.svg";

export const DeepgramNode = {
  type: "custom",
  position: { x: 50, y: 0 },
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
        value: "",
      },
      {
        type: "select",
        label: "Encoding",
        options: [
          {
            value: 'USD',
            label: '$',
          },
          {
            value: 'EUR',
            label: '€',
          },
          {
            value: 'BTC',
            label: '฿',
          },
          {
            value: 'JPY',
            label: '¥',
          },
        ],
        value: "USD",
      },
      {
        type: "select",
        label: "Sample Rate",
        options: ["8000", "gpt-4", "gemini"],
        value: "8000",
      },
      {
        type: "select",
        label: "End Pointing",
        options: ["1000", "gpt-4", "gemini"],
        value: "1000",
      },
      {
        type: "select",
        label: "Model",
        options: ["Nova-2", "gpt-4", "gemini"],
        value: "Nova-2",
      },
      {
        type: "select",
        label: "Interim Results",
        options: ["True", "gpt-4", "gemini"],
        value: "True",
      },
      {
        type: "select",
        label: "Smart Format",
        options: ["True", "gpt-4", "gemini"],
        value: "True",
      },
    ],
    bottom: {
      icons: [Note_Search, Show],
      text: "Speech to Text Model",
    },
  },
};
export const OpenAINode = {
  type: "custom",
  position: { x: 100, y: 100 },
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
        placeholder: "Type something",
        value: "",
      },
      {
        type: "select",
        label: "Model",
        options: ["Linear16", "gpt-4", "gemini"],
        value: "Linear16",
      },
      {
        type: "select",
        label: "Sample Rate",
        options: ["8000", "gpt-4", "gemini"],
        value: "8000",
      },
      {
        type: "select",
        label: "End Pointing",
        options: ["gpt-3", "gpt-4", "gemini"],
        value: "gpt-3",
      },
      {
        type: "textarea",
        label: "System Prompt",
        placeholder: "Type something",
        infoIcon: Info,
        value: "",
      },
      {
        type: "text",
        label: "Train by URL",
        placeholder: "Paste URL",
        infoIcon: Info,
        fieldIcon: Open_view,
        value: "",
      },
      {
        type: "file",
        label: "Train by Document",
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
  type: "custom",
  position: { x: 200, y: 200 },
  data: {
    nodeIcon: Google_TTS,
    title: "Google TTS",
    description: "Generates speech using Google TTS.",
    playIcon: play,
    fields: [
      {
        type: "select",
        label: "Select Language",
        infoIcon: Info,
        options: ["English(United States)", "Hindi", "English"],
        value: "English(United States)",
      },
      {
        type: "select",
        label: "Audio Device Profile",
        infoIcon: Info,
        options: ["jhdag", "Hindi", "English"],
        value: "jhdag",
      },
      {
        type: "select",
        label: "Voice",
        options: ["gpt-7", "gpt-4", "gemini"],
        value: "gpt-7",
      },
      {
        type: "text",
        label: "Speed",
        placeholder: "Paste URL",
        fieldIcon: Open_view,
        value: "",
      },
    ],
    bottom: {
      icons: [Note_Search, Show],
      text: "Text to Speech",
    },
  },
};
