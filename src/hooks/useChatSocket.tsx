import { useEffect, useRef, useState } from "react";

// Define types for messages
export interface InitMessage {
  type: "init";
  agent_id: string;
}

export interface ChatMessage {
  type: "message";
  user_id: string;
  agent_id: string;
  message_type: "in" | "out";
  message: string;
  contact_id: string;
  attachment: string | null;
}

type IncomingMessage = InitMessage | ChatMessage;

interface UseChatSocketParams {
  agentId: string;
  userId: string;
  contactId: string;
}

export const useChatSocket = ({
  agentId,
  userId,
  contactId,
}: UseChatSocketParams) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<IncomingMessage[]>([]);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://1msg.1point1.in:3003/");

    socketRef.current.addEventListener("open", () => {
      console.log("Connected to WebSocket server");

      const initMessage: InitMessage = {
        type: "init",
        agent_id: agentId,
      };
      socketRef.current?.send(JSON.stringify(initMessage));
    });

    socketRef.current.addEventListener("message", (event: MessageEvent) => {
      const data: any = JSON.parse(event.data);
      console.log(data ," data");
      const messages = data.type == "history" ? data.messages : [data];
      setMessages((prev) => [...prev, ...messages]);
    });
    socketRef.current.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });
    socketRef.current.addEventListener("close", (event) => {
      console.log("WebSocket connection closed:", event);
    });
    return () => {
      socketRef.current?.close();
    };
  }, [agentId]);

  const sendMessage = (messageText: string) => {
    const chatMessage: ChatMessage = {
      type: "message",
      user_id: userId,
      agent_id: agentId,
      message_type: "out",
      message: messageText,
      contact_id: contactId,
      attachment: null,
    };

    socketRef.current?.send(JSON.stringify(chatMessage));
  };

  return { messages, sendMessage };
};
