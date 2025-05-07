import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import "./agentLists.scss";
import { useEffect, useState } from "react";
import search from "../../../assets/Search.svg";
import AgentInfoDialogBox from "../AgentInfoDialogBox";
import AgentDataTable from "./AgentDataTable";
import { useDispatch } from "react-redux";
import { useDebounce } from "../../../utils/useDebounce";
import { fetchAgentsBySearch } from "../../../services/agentFlowServices";
import { AppDispatch, RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
const textFieldStyle = {
  width: "40%",
  mt: "10px",
  "& .MuiInputBase-root": {
    border: "1px solid #41414B",
    borderRadius: "8px",
    "&.Mui-focused fieldset": {
      borderColor: "#FF581C",
    },
  },
  "& .MuiInputBase-input": {
    color: "#B8B9C1",
    padding: "10px 0",
    fontFamily: "GeneralSans-m",
    fontSize: "14px",
  },
};
const AgentLists = ({}: any) => {
  const [open, setOpen] = useState<any>(false);
  const { auth } = useSelector((state: RootState) => state);
  const user_id = auth?.response?.user_id;
  const dispatch = useDispatch<AppDispatch>();
  const [searchText, setSearchText] = useState<any>("");
  const debouncedSearch = useDebounce(searchText, 500);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchAgentsBySearch({ userId: user_id, query: debouncedSearch }));
  }, [debouncedSearch, dispatch]);

  return (
    <Box className="container">
      <Box className="heading-content">
        <Typography className="heading">Manage Agents</Typography>
        <TextField
          variant="outlined"
          placeholder="Search an Agent"
          sx={textFieldStyle}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  component="img"
                  src={search}
                  alt="User Icon"
                  sx={{ width: 24, height: 24 }}
                />
              </InputAdornment>
            ),
          }}
        />
        <Button onClick={handleClickOpen} className="btn">
          Create New Agent +
        </Button>
      </Box>
      <AgentInfoDialogBox
        open={open}
        handleClose={handleClose}
        textFieldStyle={textFieldStyle}
      />

      <AgentDataTable />
    </Box>
  );
};

export default AgentLists;
