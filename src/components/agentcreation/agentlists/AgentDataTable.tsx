import React, { useContext, useMemo, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Checkbox,
  Box,
  Button,
  Pagination,
  PaginationItem,
  styled, // Import the styled utility
} from "@mui/material";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import Delete from "../../../assets/agentdialogicon/Delete.svg";
import Editagent from "../../../assets/agentdialogicon/Editagent.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch } from "react-redux";
import { deleteAgent, deleteEmailAgent } from "../../../services/agentFlowServices";
import { setInitialNodes } from "../../../redux/nodeSlice/nodeSlice";
import { agentStore } from "../../../providers/AgentContext";
import { setBreadcrumbs } from "../../../redux/nodeSlice/breadcrumbSlice";
import { formatDate } from "../../../utils";

const NavButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#41414B",
  color: "#fff !important",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "14px",
  padding: theme.spacing(0.5, 2),
  boxShadow: "none",
  cursor: "pointer !important",
  "&:hover": {
    backgroundColor: "#4a4a57",
  },
}));

const AgentDataTable = () => {
  const { agents } = useSelector((state: RootState) => state.agents);
  const TableHeaders = ["", "Agent Name", "Created On", "Created By", "Action"];
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { agentFlowtoggle, setAgentFlowtoggle, setEditAgentData } =
    useContext(agentStore);
  const rowsPerPage = 10;

  const selectedBotName = useSelector((state: RootState) => state.selectBot);
  const mailBotSelected = selectedBotName?.selectedBot === "Email_Bot";
  console.log("mailBotSelected", mailBotSelected);


  const paginatedAgents = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return agents.slice(startIndex, startIndex + rowsPerPage);
  }, [agents, page]);

  const totalPages = Math.ceil(agents.length / rowsPerPage);

  const isAllSelected = paginatedAgents.every((agent: any) =>
    selectedIds.includes(agent.id)
  );
  const isSomeSelected =
    paginatedAgents.some((agent: any) => selectedIds.includes(agent.id)) &&
    !isAllSelected;

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newIds = paginatedAgents.map((a: any) => a.id);
      const updated = Array.from(new Set([...selectedIds, ...newIds]));
      setSelectedIds(updated);
    } else {
      const filtered = selectedIds.filter(
        (id) => !paginatedAgents.some((agent: any) => agent.id === id)
      );
      setSelectedIds(filtered);
    }
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const handlAgentDelete = (id: any) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      if (mailBotSelected) {
        dispatch(deleteEmailAgent(id));
      } else {
        dispatch(deleteAgent(id));
      }
    }
  };
  
  const handlAgentEdit = (agent: any) => {
    dispatch(mailBotSelected ? setBreadcrumbs([
      { label: "My Email Agent", path: "/emailBot/emailBotAIAgents" },
      { label: agent.agent_type, path: "/emailBot" },
    ]) :
      setBreadcrumbs([
        { label: "My Agent", path: "/voicebot/ai-agents" },
        { label: agent.agent_type, path: "/voicebot" },
      ])
    );
    const flowNodes = JSON.parse(agent.nodes_list);
    console.log({ flowNodes });
    // dispatch(editNodes(flowNodes));
    dispatch(setInitialNodes(flowNodes));
    setEditAgentData(agent);
    setAgentFlowtoggle(!agentFlowtoggle);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ bgcolor: "#1e1e1e", mt: "30px", border: "1px solid #505060" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#43454e" }}>
              <TableCell
                padding="checkbox"
                sx={{
                  color: "#D9D9DE",
                  padding: "10px",
                  fontSize: 12,
                  fontWeight: 500,
                  border: "none",
                }}
              >
                <Checkbox
                  sx={{
                    p: "3px",
                    color: "#5D5E6C",
                    "&.Mui-checked": {
                      color: "#5D5E6C",
                    },
                  }}
                  checked={isAllSelected}
                  indeterminate={isSomeSelected}
                  onChange={handleSelectAll}
                />
              </TableCell>
              {TableHeaders.slice(1).map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "#D9D9DE",
                    padding: "10px",
                    fontSize: 12,
                    fontWeight: 500,
                    border: "none",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedAgents.map((agent: any, index: number) => {
              const isEvenRow = index % 2 === 0;
              const bgColor = isEvenRow ? "#18181b" : "#2a2a33";
              const isChecked = selectedIds.includes(agent.id);

              return (
                <TableRow key={agent.id} hover>
                  <TableCell
                    padding="checkbox"
                    sx={{
                      border: "none",
                      backgroundColor: bgColor,
                    }}
                  >
                    <Checkbox
                      sx={{
                        color: "#5D5E6C",
                        "&.Mui-checked": {
                          color: "#5D5E6C",
                        },
                      }}
                      checked={isChecked}
                      onChange={() => handleSelectOne(agent.id)}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#D9D9DE",
                      border: "none",
                      backgroundColor: bgColor,
                    }}
                  >
                    {agent?.agent_name}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#D9D9DE",
                      border: "none",
                      backgroundColor: bgColor,
                    }}
                  >
                    {formatDate(agent?.created_date)}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#D9D9DE",
                      border: "none",
                      backgroundColor: bgColor,
                    }}
                  >
                    {agent?.created_by}
                    {/* manoj */}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#D9D9DE",
                      border: "none",
                      backgroundColor: bgColor,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Box
                        component="img"
                        src={Delete}
                        alt="Delete"
                        sx={{ width: 22, height: 22, cursor: "pointer" }}
                        onClick={() => handlAgentDelete(agent?.id)}
                      />
                      <Box
                        component="img"
                        src={Editagent}
                        alt="Edit"
                        sx={{ width: 22, height: 22, cursor: "pointer" }}
                        onClick={() => handlAgentEdit(agent)}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 20px",
            alignItems: "center",
            backgroundColor: "#1e1e1e",
            borderTop: "1px solid #444",
          }}
        >
          <NavButton
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            startIcon={<ArrowBackIcon />}
          >
            Previous
          </NavButton>

          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
            siblingCount={1}
            boundaryCount={1}
            renderItem={(item) =>
              item.type === "page" ? (
                <PaginationItem
                  {...item}
                  sx={{
                    color: "#fff",
                    borderRadius: "10px",
                    "&.Mui-selected": {
                      backgroundColor: "#FF581C",
                      color: "#fff",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#FF5A1F",
                      },
                    },
                    "&:hover": {
                      backgroundColor: "#2c2c2c",
                    },
                  }}
                />
              ) : null
            }
          />

          <NavButton
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            endIcon={<ArrowForwardIcon />}
          >
            Next
          </NavButton>
        </Box>
      </TableContainer>
    </>
  );
};

export default AgentDataTable;
