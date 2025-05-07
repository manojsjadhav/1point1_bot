import { Layout } from '../../../components';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    IconButton,
    InputAdornment,
    Pagination,
    PaginationItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import SensorsOutlinedIcon from '@mui/icons-material/SensorsOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useMemo, useState } from 'react';
import CreateGroupModal from './CreateGroupModal';
import GroupModal from './GroupModal';
import Delete from "../../../assets/agentdialogicon/Delete.svg";
import Editagent from "../../../assets/agentdialogicon/Editagent.svg";
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { fetchGroups } from '../../../redux/nodeSlice/getContactGroupSlice';
import { deleteGroup } from '../../../redux/nodeSlice/deleteContactGroupSlice';
import { resetContactGroupState } from '../../../redux/nodeSlice/createcontactGroupSlice';

import { fetchContactDetails } from '../../../redux/nodeSlice/getContactDetailsSlice';
import { setSelectedGroup } from '../../../redux/nodeSlice/groupSlice';
import { setSelectedModalName } from '../../../redux/nodeSlice/modolNameSlice';

const rowsPerPage = 10;

const ContactGroups = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [openAddNew, setOpenAddNew] = useState(false);
    const [openViewContact, setOpeViewContact] = useState(false);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);


    const { success } = useSelector((state: RootState) => state.createGroup);

    const groupsState = useSelector((state: RootState) => state && state.groups);
    const contactState = useSelector((state: RootState) => state && state.contactDetails);
    const { auth } = useSelector((state: RootState) => state);
    const user_id = auth?.response?.user_id;

    const groups = groupsState?.groups || [];
    const contactDetails = contactState?.contactsDeatails || [];

    const loading = groupsState?.loading;

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const allIds = paginatedData.map((row) => row.id);
            setSelectedRows(allIds);
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id: string) => {
        setSelectedRows((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((rowId) => rowId !== id)
                : [...prevSelected, id]
        );
    };

    const handleOpenAddNew = (Row?: any) => {
        if (Row) {
            dispatch(setSelectedGroup(Row))
            dispatch(setSelectedModalName("Edit_Group_Name"))
        } else {
            dispatch(setSelectedModalName("Add_New_Group_Name"))
        }
        setOpenAddNew(true)
    };

    const handleOpenViewContact = () => setOpeViewContact(true);

    const handleDelete = async (id: string) => {
        try {
            await dispatch(deleteGroup(id));
            dispatch(fetchGroups(user_id));
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    useEffect(() => {
        if (user_id) {
            dispatch(fetchGroups(user_id));
            dispatch(fetchContactDetails(user_id));
        }
    }, [dispatch, user_id]);

    const filteredData = useMemo(() => {
        return groups.filter((item: any) =>
            item.group_name?.toLowerCase().includes(search.toLowerCase())
        );
    }, [groups, search]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, page]);

    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        if (success) {
            console.log('Group created successfully!');
            dispatch(resetContactGroupState());
        }
    }, [success, dispatch]);

    if (loading) return <div>Loading...</div>;

    const chartHistoryHeader = () => (
        <>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ color: 'white', fontWeight: 500, fontSize: '20px' }}>
                    Contact Groups
                </Typography>
                <Button
                    variant="contained"
                    endIcon={<AddOutlinedIcon />}
                    onClick={() => handleOpenAddNew()}
                    sx={{
                        borderRadius: '8px',
                        bgcolor: '#ff5a1f',
                        color: '#fff',
                        px: 4,
                        height: 36,
                        textTransform: 'none',
                        fontWeight: 500,
                    }}
                >
                    Add New
                </Button>
            </Box>
            <CreateGroupModal
                open={openAddNew}
                onClose={() => setOpenAddNew(false)}
                isCreateModal={true}
            />
        </>
    );

    const groupSearch = () => (
        <TextField
            fullWidth
            placeholder="Search groups..."
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search sx={{ color: '#444' }} />
                    </InputAdornment>
                ),
            }}
            sx={{
                border: '1px solid #505060',
                borderRadius: '8px',
                bgcolor: '#18181b',
                width: 600,
                '& .MuiInputBase-root': {
                    height: 36,
                    borderRadius: '8px',
                    pl: 1,
                },

                '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                        borderColor: '#ff5a1f',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#ff5a1f',
                    },
                },
                input: {
                    color: '#fff',
                    padding: '10px ',
                },
                mb: 2,

            }}
        />
    );

    const contactGroupsTable = () => {
        const TableHeaders = ['Group Name', 'Created on', 'Created By', 'Action'];
        return (
            <>
                <TableContainer component={Paper} sx={{ bgcolor: '#1e1e1e' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#43454e' }}>
                                {TableHeaders.map((header) => (
                                    <TableCell
                                        key={header}
                                        sx={{
                                            color: '#D9D9DE',
                                            padding: '16px',
                                            lineHeight: 1.8,
                                            fontSize: 12,
                                            fontWeight: 500,
                                            border: 'none',
                                        }}
                                    >
                                        {header === "Group Name" && (
                                            <Checkbox
                                                checked={selectedRows.length === paginatedData.length}
                                                indeterminate={
                                                    selectedRows.length > 0 && selectedRows.length < paginatedData.length
                                                }
                                                onChange={handleSelectAll}
                                                sx={{
                                                    color: "white",
                                                    '&.Mui-checked': {
                                                        color: "#F36C30",
                                                    },
                                                }}
                                            />
                                        )}

                                        {header}
                                        {header === 'Action' && <IconButton><ErrorOutlineOutlinedIcon sx={{ fontSize: 16, color: '#a1a1aa' }} /></IconButton>}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody sx={{ border: '1px solid #505060', borderTop: "none", borderBottom: "none" }}>
                            {paginatedData.map((row: any, index: any) => {
                                const isEvenRow = index % 2 === 0;
                                const bgColor = isEvenRow ? '#18181b' : '#2a2a33';

                                return (
                                    <TableRow key={index}>
                                        <TableCell sx={{ color: '#D9D9DE', border: 'none', backgroundColor: bgColor }}>
                                            <IconButton sx={{ padding: "0px" }}>
                                                <Checkbox
                                                    checked={selectedRows.includes(row.id)}
                                                    onChange={() => handleSelectRow(row.id)}
                                                    sx={{
                                                        color: "white",
                                                        '&.Mui-checked': {
                                                            color: "#F36C30",
                                                        },
                                                    }}
                                                />
                                            </IconButton>
                                            <IconButton>
                                                <Avatar
                                                    src={row.group_avtar}
                                                    sx={{ width: 26, height: 26 }}
                                                />

                                            </IconButton>
                                            {row.group_name}
                                        </TableCell>
                                        <TableCell sx={{ color: '#D9D9DE', border: 'none', backgroundColor: bgColor }}>
                                            {formatDate(row.created_date)}
                                        </TableCell>
                                        <TableCell sx={{ color: '#D9D9DE', border: 'none', backgroundColor: bgColor }}>
                                            {row.created_by || 'Admin'}
                                        </TableCell>
                                        <TableCell sx={{ color: '#EFF7FF', border: 'none', backgroundColor: bgColor, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <Box>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        bgcolor: '#172A54',
                                                        mr: 1,
                                                        color: '#EFF7FF',
                                                        fontSize: '12px',
                                                        borderRadius: '25px',
                                                        textTransform: 'none',
                                                    }}
                                                    endIcon={<SensorsOutlinedIcon />}
                                                >
                                                    Broadcast
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        bgcolor: '#41414B',
                                                        color: '#FFFFFF',
                                                        fontSize: '12px',
                                                        borderRadius: '25px',
                                                        textTransform: 'none',
                                                    }}
                                                    endIcon={<VisibilityOutlinedIcon />}
                                                    onClick={handleOpenViewContact}
                                                >
                                                    View Contacts
                                                </Button>
                                            </Box>

                                            <Box sx={{ display: "flex", gap: 2 }} >
                                                <IconButton onClick={() => handleDelete(row.id)}>
                                                    <img src={Delete} alt="Delete" style={{ width: 24, height: 24 }} />
                                                </IconButton>
                                                <IconButton onClick={() => handleOpenAddNew(row)}>
                                                    <img src={Editagent} alt="Edit" style={{ width: 24, height: 24 }} />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer >

                <GroupModal
                    open={openViewContact}
                    onClose={() => setOpeViewContact(false)}
                    contactDetails={contactDetails}
                /></>
        );
    };

    const paginationOfTable = () => {
        const totalPages = Math.ceil(filteredData.length / rowsPerPage);
        const navButtonStyles = {
            backgroundColor: '#3d3d48',
            color: '#ccc',
            borderRadius: '12px',
            textTransform: 'none',
            fontSize: '14px',
            px: 2,
            py: 0.5,
            boxShadow: 'none',
            '&:hover': {
                backgroundColor: '#4a4a57',
            },
        };
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    border: '1px solid #505060',
                    p: '8px 14px',
                    alignItems: 'center',
                    borderRadius: '0px 0px 10px 10px',
                    borderTop: 'none'
                }}
            >
                {/* Previous Button */}
                <Button
                    variant="contained"
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    startIcon={<ArrowBackIcon />}
                    sx={navButtonStyles}
                >
                    Previous
                </Button>

                {/* Pagination */}
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    variant="outlined"
                    shape="rounded"
                    siblingCount={1}
                    boundaryCount={1}
                    renderItem={(item) =>
                        item.type === 'page' ? (
                            <PaginationItem
                                {...item}
                                sx={{
                                    color: '#fff',
                                    borderRadius: '10px',
                                    fontWeight: 'normal',
                                    '&.Mui-selected': {
                                        backgroundColor: '#FF581C',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#FF5A1F',
                                        },
                                    },
                                    '&:hover': {
                                        backgroundColor: '#2c2c2c',
                                    },
                                }}
                            />
                        ) : null
                    }
                />

                {/* Next Button */}
                <Button
                    variant="contained"
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    endIcon={<ArrowForwardIcon />}
                    sx={navButtonStyles}
                >
                    Next
                </Button>
            </Box>

        )
    }

    return (
        <Layout>
            <Box sx={{ p: 3, backgroundColor: '#0E0E11', color: '#fff', minHeight: '100vh', width: '100%' }}>
                {chartHistoryHeader()}
                {groupSearch()}
                {contactGroupsTable()}
                {paginationOfTable()}
            </Box>
        </Layout>
    );
};

export default ContactGroups;
