import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];
interface UpdateNodeDataPayload {
  id: string;
  data: any;
}
const nodeSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setInitialNodes: (_, action: PayloadAction<any[]>) => {
      return action.payload;
    },
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

export const { addNode, updateNodeData, setInitialNodes } = nodeSlice.actions;
export default nodeSlice.reducer;
