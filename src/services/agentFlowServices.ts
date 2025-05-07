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
        `http://1msg.1point1.in:3001/api/auth/j-v1/agents_by_user?id=${user_id}`
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchAgentsBySearch = createAsyncThunk(
  "agents/fetchBySearch",
  async ({ userId, query }: { userId: any; query: any }) => {
    const response = await axios.get(
      `http://1msg.1point1.in:3001/api/auth/j-v1/agents/search/`,
      { params: { user_id: userId, q: query } }
    );
    return response.data;
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

export const deleteAgent = createAsyncThunk(
  "agentList/deleteAgent",
  async (agentId: any, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://1msg.1point1.in:3001/api/auth/j-v1/agents/delete/${agentId}`
      );
      return agentId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);
