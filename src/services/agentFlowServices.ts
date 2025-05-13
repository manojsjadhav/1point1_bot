import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const postAgentFlow = async (payload: any): Promise<void> => {
  try {
    await axios.post(
      "http://1msg.1point1.in:3001/api/auth/j-v1/user_req/",
      payload
    );
    console.log("Data posted successfully");
  } catch (error) {
    const err = error as AxiosError;
    console.error("Failed to post agent flow:", err.message);
  }
};

export const fetchAgentList = createAsyncThunk<any>(
  "agents/fetchAgentList",
  async (user_id, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://1msg.1point1.in:3001/api/auth/j-v1/agents_by_user/?id=${user_id}`
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchEmailBotAgentList = createAsyncThunk(
  "agents/fetchEmailBotAgentList",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://1msg.1point1.in:3001/api/email/bot/get-all/email-user/bot/j-v1/`
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const fetchAgentsBySearch = createAsyncThunk(
  "agents/fetchBySearch",
  async ({ userId, query }: { userId: any; query: any }) => {
    if (query) {
      const response = await axios.get(
        `http://1msg.1point1.in:3001/api/auth/j-v1/agents/search/`,
        { params: { user_id: userId, q: query } }
      );
      return response.data;
    } else {
      const res = await axios.get(
        `http://1msg.1point1.in:3001/api/auth/j-v1/agents_by_user/?id=${userId}`
      );
      return res.data;
    }
  }
);

export const addAgent = createAsyncThunk<any, Partial<any>>(
  "agents/addAgent",
  async (newAgentData, thunkAPI) => {
    try {
      const res = await axios.post("https://your-api.com/agents", newAgentData);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const editAgent = createAsyncThunk<
  any,
  { id: any; updatedData: any },
  { rejectValue: string }
>("agentList/editAgent", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `http://1msg.1point1.in:3001/api/auth/j-v1/agents/edit/${id}/`,
      updatedData
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Update failed");
  }
});

export const deleteAgent = createAsyncThunk(
  "agentList/deleteAgent",
  async (agentId: any, { rejectWithValue }) => {
    try {
      await axios.delete(
        `http://1msg.1point1.in:3001/api/auth/j-v1/agents/delete/${agentId}`
      );
      return agentId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

export const getSubmenuList = async () => {
  try {
    const result = await axios.get(
      "http://1msg.1point1.in:3001/api/auth/j-v1/all_models/"
    );
    return result.data.models;
  } catch (error: any) {
    console.log("getSubmenuList", error.message);
  }
};

export const postEmailAgentFlow = async (payload: any): Promise<void> => {
  try {
    await axios.post(
      "http://1msg.1point1.in:3001/api/email/bot/create/email-user/bot/j-v1/",
      payload
    );
    console.log("Data posted successfully");
  } catch (error) {
    const err = error as AxiosError;
    console.error("Failed to post agent flow:", err.message);
  }
};

export const editEmailAgent = createAsyncThunk<
  any,
  { id: any; updatedData: any },
  { rejectValue: string }
>(
  "agentList/editEmailAgent",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://1msg.1point1.in:3001/api/email/bot/update/email-user/bot/j-v1/?agent_id=${id}`,
        updatedData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

export const deleteEmailAgent = createAsyncThunk(
  "agentList/deleteEmailAgent",
  async (agentId: any, { rejectWithValue }) => {
    try {
      await axios.delete(
        `http://1msg.1point1.in:3001/api/email/bot/delete/email-user/bot/j-v1/?agent_id=${agentId}`
      );
      return agentId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);
export const getChatAgentList = createAsyncThunk<any>(
  "agents/getChatAgentList",
  async (user_id, thunkAPI) => {
    console.log("user_id", user_id);
    try {
      const res = await axios.get(
        `http://1msg.1point1.in:3001/api/chat/bot/agents/user/${user_id}`
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
