import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];
interface UpdateNodeDataPayload {
  id: string;
  data: any; // The new data to merge with the existing node data
}
const nodeSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<any>) => {
      state.push(action.payload);
    },
    updateNodeData: (state, action: PayloadAction<UpdateNodeDataPayload>) => {
      state.nodes = state.nodes.map((node: any) =>
        node.id === action.payload.id
          ? { ...node, data: action.payload.data }
          : node
      );
    },
  },
});

export const { addNode, updateNodeData } = nodeSlice.actions;
export default nodeSlice.reducer;
