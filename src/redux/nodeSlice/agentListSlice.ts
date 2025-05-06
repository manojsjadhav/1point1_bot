import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addAgent,
  fetchAgentList,
  fetchAgentsBySearch,
} from "../../services/agentFlowServices";

interface AgentListState {
  agents: any;
  loading: boolean;
  error: string | null;
}

const initialState: AgentListState = {
  agents: [],
  loading: false,
  error: null,
};

const agentListSlice = createSlice({
  name: "agentList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAgentList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.agents = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchAgentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAgent.fulfilled, (state, action: PayloadAction<any>) => {
        state.agents.push(action.payload);
        state.loading = false;
      })
      .addCase(addAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchAgentsBySearch.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.agents = action.payload;
        }
      );
  },
});

export default agentListSlice.reducer;
