import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addAgent,
  fetchAgentList,
  fetchAgentsBySearch,
  deleteAgent,
  editAgent,
  fetchEmailBotAgentList,
  getChatAgentList,
} from "../../services/agentFlowServices";


interface AgentListState {
  agents: any[];
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
        (state, action: PayloadAction<any[]>) => {
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
        (state, action: PayloadAction<any[]>) => {
          state.agents = action.payload;
        }
      )
      .addCase(editAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAgent.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.agents.findIndex(
          (agent) => agent.id === action.payload.id
        );
        if (index !== -1) {
          state.agents[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(editAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteAgent.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.agents = state.agents.filter(
            (agent) => agent.id !== action.payload
          );
          state.loading = false;
        }
      )
      .addCase(deleteAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Email Bot Agents
      .addCase(fetchEmailBotAgentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEmailBotAgentList.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.agents = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchEmailBotAgentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // chat agents
      .addCase(getChatAgentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getChatAgentList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.agents = action.payload;
          state.loading = false;
        }
      )
      .addCase(getChatAgentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default agentListSlice.reducer;
