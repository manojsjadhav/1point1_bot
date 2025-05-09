import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

const initialState: any = [];
// interface UpdateNodeDataPayload {
//   id: string;
//   data: any;
// }
const nodeSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setInitialNodes: (state, action: PayloadAction<any[]>) => {
      state.length = 0;
      state.push(...cloneDeep(action.payload));
      console.log("agent edit data:", action.payload);
    },
    addNode: (state, action: PayloadAction<any>) => {
      state.push(action.payload);
    },
    // editNodes: (state, action: PayloadAction<any>) => {
    //   state.nodes = action.payload;
    // },
    // updateNodeData: (state, action: PayloadAction<UpdateNodeDataPayload>) => {
    //   state.nodes = state.nodes.map((node: any) =>
    //     node.id === action.payload.id
    //       ? { ...node, data: action.payload.data }
    //       : node
    //   );
    // },
  },
});

export const { addNode, setInitialNodes } = nodeSlice.actions;
export default nodeSlice.reducer;
