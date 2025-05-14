import Chatgpt from "../../assets/componentmenuicon/Chatgpt.svg";
import Deepgram from "../../assets/componentmenuicon/Deepgram.svg";
import Delete from "../../assets/agentdialogicon/Delete.svg";
import Show from "../../assets/componentmenuicon/Show.svg";
import Info from "../../assets/componentmenuicon/Info.svg";
import Note_Search from "../../assets/componentmenuicon/Note_Search.svg";
import Google_TTS from "../../assets/componentmenuicon/Google_TTS.svg";
import Email from "../../assets/Mail.svg";
import play from "../../assets/componentmenuicon/play.svg";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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

export const fetchModelParameters = async (id: any) => {
  try {
    const response = await axios.get(
      "http://1msg.1point1.in:3001/api/auth/j-v1/model_parameters/",
      { params: { model_id: id } }
    );

    console.log({ response });
    const fieldArr: any[] = [];
    function normalizeSelectValues(input: string): (string | number)[] {
      try {
        if (!input?.trim()) return [];
        const fixed = input.replace(/([{,])\s*(\w+)\s*:/g, '$1"$2":');
        const parsed = JSON.parse(fixed);
        if (!Array.isArray(parsed)) return [];
        if (
          parsed.every(
            (item) => typeof item === "string" || typeof item === "number"
          )
        ) {
          return parsed;
        }
        if (
          parsed.every(
            (item) =>
              typeof item === "object" && item !== null && "value" in item
          )
        ) {
          return parsed.map((item: any) => item.value);
        }
        return [];
      } catch (error) {
        console.error("normalizeSelectValues error:", error);
        return [];
      }
    }

    (response.data || []).forEach((item: any) => {
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
          placeholder: "Select an Option",
          options: normalizeSelectValues(item?.select_values),
          value: normalizeSelectValues(item?.select_values)[0],
        });
      } else {
        fieldArr.push(baseField);
      }
    });
    console.log("check field:", fieldArr);
    return fieldArr;
  } catch (error) {
    console.error("Error fetching model parameters:", error);
  }
};

const DeepgramNode = {
  nodetype: "STT",
  type: "custom",
  position: { x: 50, y: 50 },
  data: {
    nodeIcon: Deepgram,
    title: "Deepgram",
    description: "Generates text using Deepgram LLMs.",
    playIcon: Delete,
    fields: [],
    bottom: {
      icons: [Note_Search, Show],
      text: "Speech to Text Model",
    },
  },
};
export const OpenAINode = {
  nodetype: "LLM",
  type: "custom",
  position: { x: 400, y: 100 },
  data: {
    nodeIcon: Chatgpt,
    title: "Open AI",
    description: "Generates text using OpenAI LLMs.",
    playIcon: Delete,
    fields: [],
    bottom: {
      icons: [Note_Search, Show],
      text: "Language Learning Model",
    },
  },
};
export const GoogleTTSNode = {
  nodetype: "TTS",
  type: "custom",
  position: { x: 750, y: 150 },
  data: {
    nodeIcon: Google_TTS,
    title: "Google TTS",
    description: "Generates speech using Google TTS.",
    playIcon: Delete,
    fields: [],
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

export const EmailConfigurationLLM: any = {
  id: uuidv4(),
  nodetype: "Email",
  type: "custom",
  position: { x: 750, y: 150 },
  measured: {
    width: 280,
    height: 510,
  },
  data: {
    nodeIcon: Email,
    title: "Email Configuration",
    description: "Fill details to configure your email",
    playIcon: play,
    fields: [
      {
        type: "text",
        label: "SMTP Host",
        infoIcon: Info,
        placeholder: "Type something",
        name: "smtp_host",
        value: "mail.1point1.in",
      },
      {
        type: "text",
        infoIcon: Info,
        label: "SMTP Port",
        name: "smtp_port",
        placeholder: "Add Port number (eg.567)",
        value: "465",
      },
      {
        type: "text",
        label: "IMAP Host",
        infoIcon: Info,
        placeholder: "Type something",
        name: "imap_host",
        value: "mail.1point1.in",
      },
      {
        type: "text",
        infoIcon: Info,
        label: "IMAP Port",
        name: "imap_port",
        placeholder: "Add Port number (eg.567)",
        value: "993",
      },
      {
        type: "select",
        label: "Use TLS Encryption",
        name: "tls",
        options: ["true", "false"],
        value: "true",
      },
      {
        type: "select",
        label: "Use SSL Encryption",
        name: "ssl",
        options: ["false", "true"],
        value: "false",
      },
      {
        type: "text",
        label: "Email Id",
        name: "mailid",
        placeholder: "Add your email address",
        value: "airline.demo@1point1.in",
      },
      {
        type: "text",
        label: "Email Password",
        name: "mailpass",
        placeholder: "Add your email password",
        value: "Info@1234",
      },
    ],
    bottom: {
      icons: [Note_Search, Show],
      text: "Email Configuration",
    },
  },
};

export const nodeListData = [OpenAINode, DeepgramNode, GoogleTTSNode];
