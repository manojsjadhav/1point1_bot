import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "../../nodes/agentCustomNode.scss";
import "@xyflow/react/dist/style.css";
import { useCallback, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import AgentCustomNode from "../../nodes/AgentCustomNode.tsx";
import playIcon from "../../assets/componentmenuicon/play.svg";
import chevron_down from "../../assets/chevron-down.svg";
import { RootState } from "../../redux/store.ts";
import { Box, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { postAgentFlow } from "../../services/agentFlowServices.ts";
import { getCurrentFormattedDate } from "../../nodes/utils/nodedata.ts";
import { agentStore } from "../../providers/AgentContext.tsx";
import { setInitialNodes } from "../../redux/nodeSlice/nodeSlice.ts";
import { useDispatch } from "react-redux";

const nodeTypes = { custom: AgentCustomNode };

export default function NodeLists() {
  const allNode = useSelector((state: RootState) => state.nodes);
  const { agentDetails, agentFlowtoggle, setAgentFlowtoggle } =
    useContext(agentStore);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const dispatch = useDispatch();
  console.log({nodes})
  const handleflowsubmit = async () => {
    const tempId: any = uuidv4();
    const dammyData: any = {
      created_date: getCurrentFormattedDate(),
      ...agentDetails,
      sts_model_id: tempId,
      sts_model_perms: {},
      llm_model_id: tempId,
      llm_model_param: {},
      llm_model_document: "This is a document content",
      tts_model_id: tempId,
      tts_model_perm: {},
      nodes: nodes,
      edges: edges,
    };
    const requiredNodeTypes = [
      "speech_to_text",
      "text_to_speech",
      "llm_models",
    ];
    const foundNodeTypes = new Set(nodes.map((node: any) => node.nodetype));
    const missingTypes = requiredNodeTypes.filter(
      (type) => !foundNodeTypes.has(type)
    );
    if (missingTypes.length > 0) {
      alert(`Missing required node types: ${missingTypes.join(", ")}`);
      return;
    }
    nodes.forEach((node: any) => {
      if (node.nodetype === "speech_to_text") {
        node.data.fields.map(
          (field: any) => (dammyData.sts_model_perms[field.name] = field.value)
        );
      } else if (node.nodetype === "text_to_speech") {
        node.data.fields.map(
          (field: any) => (dammyData.tts_model_perm[field.name] = field.value)
        );
      } else if (node.nodetype === "llm_models") {
        node.data.fields.map(
          (field: any) => (dammyData.llm_model_param[field.name] = field.value)
        );
      }
    });
    const hasEmptyFields = [
      dammyData.sts_model_perms,
      dammyData.llm_model_param,
      dammyData.tts_model_perm,
    ].some((agent) =>
      Object.values(agent).some(
        (val) => val === "" || val === null || val === undefined
      )
    );
    if (hasEmptyFields) {
      alert("please fillup all correct node and make sure any is not empty");
    } else {
      await postAgentFlow(dammyData);
      dispatch(setInitialNodes([]));
      setNodes(allNode);
      setAgentFlowtoggle(!agentFlowtoggle);
    }
  };

  const onConnect = useCallback(
    (params: Connection | Edge) =>
      setEdges((eds: any[]) => addEdge(params, eds)),
    [setEdges]
  );
  useEffect(() => {
    setNodes(allNode);
  }, [allNode]);
  console.log({ edges });
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Panel position="top-right">
          <Box
            sx={{
              backgroundColor: "#2A2A33",
              padding: "8px 12px",
              borderRadius: "8px",
              boxShadow: 3,
              width: "210px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                fontFamily: "GeneralSans-m",
                fontSize: "14px",
                color: "#fff",
                px: "25px",
                height: "36px",
              }}
            >
              <Box
                component="img"
                src={playIcon}
                alt="Apple"
                sx={{ width: 24, height: 24 }}
              />
              test
            </Button>
            <Button
              sx={{
                background: "#FF581C",
                textTransform: "none",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                fontFamily: "GeneralSans-m",
                fontSize: "14px",
                color: "#fff",
                px: "25px",
                height: "36px",
              }}
              onClick={() => handleflowsubmit()}
            >
              Publish
              <Box
                component="img"
                src={chevron_down}
                alt="Apple"
                sx={{ width: 24, height: 24, color: "#FFF" }}
              />
            </Button>
          </Box>
        </Panel>

        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
