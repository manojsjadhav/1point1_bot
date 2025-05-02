import { useCallback, useEffect } from "react";
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  Edge,
  Connection,
  OnNodesChange,
  OnEdgesChange,
  NodeChange, // Correct import: NodeChange
} from "@xyflow/react";
import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import AgentCustomNode from "../../nodes/AgentCustomNode.tsx";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { updateNodeData } from "../../redux/nodeSlice/nodeSlice.ts";

const nodeTypes = { custom: AgentCustomNode };

export default function NodeLists() {
  const allNode = useSelector((state: RootState) => state.nodes);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const dispatch = useDispatch();
console.log({nodes})
  useEffect(()=>{
    setNodes(allNode)
  },[allNode])
  const onConnect = useCallback(
    (params: Connection | Edge) =>
      setEdges((eds: any[]) => addEdge(params, eds)),
    [setEdges]
  );

  // const handleNodesChange: OnNodesChange = useCallback(
  //   (changes) => {
  //     setNodes((nds: any[]) =>
  //       nds.map((node: any) => {
  //         const change = changes.find((ch: any) => ch.id === node.id);
  //         console.log({change})
  //         if (change && (change as { type: string }).type === 'data' && change.data) {
  //           dispatch(updateNodeData({ id: node.id, data: change.data }));
  //           return { ...node, data: change.data };
  //         }
  //         return node;
  //       })
  //     );
  //   },
  //   [setNodes, dispatch]
  // );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.2,
          minZoom: 0.75,
          maxZoom: 1.5,
        }}
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
