import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "../../nodes/agentCustomNode.scss";
import "@xyflow/react/dist/style.css";
import { useCallback, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import AgentCustomNode from "../../nodes/AgentCustomNode.tsx";
import playIcon from "../../assets/componentmenuicon/play.svg";
import chevron_down from "../../assets/chevron-down.svg";
import { AppDispatch, RootState } from "../../redux/store.ts";
import { Box, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { editAgent, editEmailAgent, postAgentFlow, postEmailAgentFlow } from "../../services/agentFlowServices.ts";
// import { getCurrentFormattedDate } from "../../nodes/utils/nodedata.ts";

import { agentStore } from "../../providers/AgentContext.tsx";
import { setInitialNodes } from "../../redux/nodeSlice/nodeSlice.ts";
import { useDispatch } from "react-redux";
import { cloneDeep } from "lodash";
import { toast } from "react-toastify";
import { EmailConfigurationLLM } from "../../nodes/utils/nodedata.ts";
const nodeTypes = { custom: AgentCustomNode };

export default function NodeLists() {
  const allNode = useSelector((state: RootState) => state.nodes);
  const selectedBotName = useSelector((state: RootState) => state.selectBot);
  const mailBotSelected = selectedBotName?.selectedBot === "Email_Bot";
  const { addNodes } = useReactFlow()
  const {
    agentDetails,
    // agentFlowtoggle,
    setAgentFlowtoggle,
    editAgentData,
    setEditAgentData,
  } = useContext(agentStore);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const dispatch = useDispatch<AppDispatch>();
  const lengthNodes = nodes?.length;
  const { user_id, created_by, agent_type, dialer, flow_type, agent_name } =
    agentDetails;
  const handleFlowSubmit = async () => {
    const tempId = uuidv4();
    const isEditing = editAgentData && Object.keys(editAgentData).length > 0;

    const requiredNodes = mailBotSelected
      ? ["LLM", "Email"]
      : ["speech_to_text", "text_to_speech", "llm_models"];

    const currentNodeTypes = new Set(nodes.map((node: any) => node.nodetype));
    const missingNodes = requiredNodes.filter(type => !currentNodeTypes.has(type));

    if (missingNodes.length > 0) {
      alert(`Missing required nodes: ${missingNodes.join(", ")}`);
      return;
    }

    const baseData = {
      user_id,
      dialer,
      flow_type,
      agent_name,
      created_by,
      agent_type,
      nodes_list: nodes,
      edges,
    };

    const emailAgentData = {
      ...baseData,
      sts_model_id: tempId,
      llm_model_id: "gpt-4.1",
      llm_model_param: {},
      llm_model_document: "doc-456",
      tts_model_id: "tts-en-01",
      tts_model_perm: {},
      sts_model_perms: { read: true, write: false, execute: false },
    };

    const fallbackAgentData = {
      ...baseData,
      sts_model_id: tempId,
      llm_model_id: tempId,
      tts_model_id: tempId,
      llm_model_param: {},
      llm_model_document: "This is a document content",
      tts_model_perm: {},
      sts_model_perms: {},
    };
    // Utility to populate values from fields
    const populateFields = (target: any, fields: any[]) => {
      fields.forEach(field => {
        target[field.name] = field.value;
      });
    };

    // Populate data from nodes
    nodes.forEach((node: any) => {
      const { fields, nodetype } = node.data;

      if (mailBotSelected) {
        if (nodetype === "LLM") {
          populateFields(emailAgentData.llm_model_param, fields);

          const modelField = fields.find(f => f.name === "model");
          if (modelField) emailAgentData.llm_model_id = modelField.value;

          const docField = fields.find(f => f.name === "document");
          if (docField) emailAgentData.llm_model_document = docField.value;
        }

        if (nodetype === "Email") {
          populateFields(emailAgentData.tts_model_perm, fields);
        }
      } else {
        if (nodetype === "speech_to_text") {
          populateFields(fallbackAgentData.sts_model_perms, fields);
        }

        if (nodetype === "text_to_speech") {
          populateFields(fallbackAgentData.tts_model_perm, fields);
        }

        if (nodetype === "llm_models") {
          populateFields(fallbackAgentData.llm_model_param, fields);
        }
      }
    });
    // Utility to check if any field is empty
    const hasEmptyFields = (obj: Record<string, any>) =>
      Object.values(obj).some(value => value === "" || value === null || value === undefined);

    const dataToValidate = mailBotSelected
      ? [emailAgentData.llm_model_param, emailAgentData.tts_model_perm, emailAgentData.sts_model_perms]
      : [fallbackAgentData.llm_model_param, fallbackAgentData.tts_model_perm, fallbackAgentData.sts_model_perms];

    if (dataToValidate.some(hasEmptyFields)) {
      alert("Please fill out all required node fields correctly.");
      return;
    }

    try {
      if (mailBotSelected) {
        if (isEditing) {
          dispatch(
            editEmailAgent({
              id: editAgentData.id,
              updatedData: { ...editAgentData, ...emailAgentData },
            })
          );
        } else {
          await postEmailAgentFlow(emailAgentData);
        }
      } else {
        if (isEditing) {
          dispatch(
            editAgent({
              id: editAgentData.id,
              updatedData: { ...editAgentData, ...fallbackAgentData },
            })
          );
          toast.success("Agent Edited Successfully");
        } else {
          await postAgentFlow(fallbackAgentData);
          toast.success("Agent Added Successfully");
        }
      }

      dispatch(setInitialNodes([]));
      setAgentFlowtoggle((prev: any) => !prev);
      setEditAgentData({});
    } catch (error) {
      console.error("Flow submission error:", error);
      alert("An error occurred while submitting the agent flow.");
    }
  };

  const onConnect = useCallback(
    (params: Connection | Edge) =>
      setEdges((eds: any[]) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
   if(allNode.length > 0){ 
     setNodes((prevNodes) => {
      const newNodes = cloneDeep(allNode);
      const existingIds = new Set(prevNodes.map((node) => node.id));
      const filteredNewNodes = newNodes.filter((node: any) => !existingIds.has(node.id));
      return [...prevNodes, ...filteredNewNodes];
    });
    }
  }, [allNode]);

  useEffect(() => {
    if (mailBotSelected && lengthNodes === 0) addNodes(EmailConfigurationLLM)
  }, [])

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div
        style={{
          position: "fixed",
          top: "80px",
          right: "25px",
          zIndex: 9999,
          backgroundColor: "#2A2A33",
          padding: "8px 12px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          boxShadow: "0 0 10px rgba(0,0,0,0.4)",
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
            alt="Test"
            sx={{ width: 24, height: 24, mr: 1 }}
          />
          Test
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
          onClick={handleflowsubmit}
        >
          Publish
          <Box
            component="img"
            src={chevron_down}
            alt="Publish"
            sx={{ width: 24, height: 24, ml: 1 }}
          />
        </Button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
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
              onClick={handleFlowSubmit}
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
