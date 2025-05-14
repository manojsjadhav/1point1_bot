import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const postChatAgent = async (payload: any): Promise<void> => {
  console.log({ payload });
  try {
    await axios.post(
      "http://1msg.1point1.in:3001/api/chat/bot/create/chatbot-user/bot/j-v1/",
      payload
    );
    console.log("Data posted successfully");
  } catch (error) {
    const err = error as AxiosError;
    console.error("Failed to post agent flow:", err.message);
  }
};
export const editChatAgent = createAsyncThunk<
  any,
  { id: any; updatedData: any },
  { rejectValue: string }
>("agentList/editAgent", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `http://1msg.1point1.in:3001/api/chat/bot/update/chatbot-user/bot/j-v1/?agent_id=${id}`,
      updatedData
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Update failed");
  }
});

export const deleteChatAgent = createAsyncThunk(
  "agentList/deleteChatAgent",
  async (agentId: any, { rejectWithValue }) => {
    try {
      await axios.delete(
        `http://1msg.1point1.in:3001/api/chat/bot/delete/chatbot-user/bot/j-v1/?agent_id=${agentId}`
      );
      return agentId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

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
        `http://1msg.1point1.in:3001/api/chat/bot/contacts/agent/1/user/${user_id}/`
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
        `http://1msg.1point1.in:3001/api/chat/bot/contacts/agent/${id}/user/${user_id}/`
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
