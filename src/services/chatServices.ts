import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChatHistory = createAsyncThunk(
  "chatHistory/fetchChatHistory",
  async ({ user_id, id }: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://1msg.1point1.in:3001/api/chat/bot/chat-history/user/${user_id}/agent/${id}/`
      );
      console.log(response.data, "data");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getChatHistoryByContact = createAsyncThunk(
  "chatHistory/fetchByContact",
  async (contactId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://1msg.1point1.in:3001/api/chat/bot/chat-history/contact/${contactId}/`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch chat history"
      );
    }
  }
);
export const fetchChatContact = createAsyncThunk(
  "chatHistory/fetchChatContact",
  async ({ user_id }: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://1msg.1point1.in:3001/api/chat/bot/contacts/agent/${user_id}/user/1/`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getAgentChatConstct = createAsyncThunk(
  "chatContact/fetchChatContactHistory",
  async ({ user_id, id }: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://1msg.1point1.in:3001/api/chat/bot/contacts/agent/${user_id}/user/${id}/`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getChatbotAgent = createAsyncThunk(
  "chat/getChatbotAgent",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://1msg.1point1.in:3001/api/chat/bot/get-all/chatbot-user/bot/j-v1/?agent_id=${id}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch chatbot users"
      );
    }
  }
);
