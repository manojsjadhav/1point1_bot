import React, { useEffect, useMemo, useState } from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Select, MenuItem, Button, Pagination,
    Divider, Typography,
    InputAdornment,
    TextField,
    PaginationItem,
    Chip,
} from '@mui/material';
import { Search, Visibility, PlayArrow } from '@mui/icons-material';
import { Layout } from '../../../components';
import axios from 'axios';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TranscriptDialog from './TranscriptDialog';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


type Conversation = {
    id: number;
    person_name: string;
    phone_number: string;
    dailer: string;
    connectedBy: string;
    call_duration: string;
    recording_path: string;
};

const rowsPerPage = 10;

const ConversationHistory: React.FC = () => {
    const [data, setData] = useState<Conversation[]>([]);
    const [agent, setAgent] = useState('');
    const [phone, setPhone] = useState('');
    const [fromDate, setFromDate] = useState<any>("");
    const [toDate, setToDate] = useState<any>("");
    const [page, setPage] = useState(1);
    const [openTranscript, setOpenTranscript] = useState(false);
    const handleTranscript = () => setOpenTranscript(true);

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchAgent = agent ? item.person_name === agent : true;
            const matchPhone = phone ? item.phone_number.includes(phone) : true;
            return matchAgent && matchPhone;
        });
    }, [data, agent, phone]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, page]);


    const handleSearch = () => {
        setPage(1);
    };

    const BASE_URL = 'http://1msg.1point1.in:3001/api/auth/j-v1';

    const fetchData = async () => {
        try {
            const params: any = {};
            if (fromDate) params.from_date = fromDate;
            if (toDate) params.to_date = toDate;
            if (phone) params.phone = phone;
            if (agent) params.name = agent;

            const res = await axios.get(`${BASE_URL}/search/call-history/`, { params });
            setData(res.data || []);

        } catch (error) {
            console.error('Error fetching call history:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    function formatTime(seconds: any): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}Min, ${secs} Sec`;
    }

    const messages = [
        { time: '09:41 AM', sender: 'user', text: 'Hi, Mandy', avatarUrl: '/user1.png' },
        { sender: 'user', text: 'I’ve tried the app', avatarUrl: '/user1.png' },
        { sender: 'agent', text: 'Really?', avatarUrl: '/user2.png' },
        { sender: 'user', text: "Yeah, It's really good!", avatarUrl: '/user1.png' },
        { time: '09:41 AM', sender: 'user', text: 'Hi, Mandy', avatarUrl: '/user1.png' },
        { sender: 'user', text: 'I’ve tried the app', avatarUrl: '/user1.png' },
        { sender: 'agent', text: 'Really?', avatarUrl: '/user2.png' },
        { sender: 'user', text: "Yeah, It's really good!", avatarUrl: '/user1.png' },
        { time: '09:41 AM', sender: 'user', text: 'Hi, Mandy', avatarUrl: '/user1.png' },
        { sender: 'user', text: 'I’ve tried the app', avatarUrl: '/user1.png' },
        { sender: 'agent', text: 'Really?', avatarUrl: '/user2.png' },
        { sender: 'user', text: "Yeah, It's really good!", avatarUrl: '/user1.png' },
        { time: '09:41 AM', sender: 'user', text: 'Hi, Mandy', avatarUrl: '/user1.png' },
        { sender: 'user', text: 'I’ve tried the app', avatarUrl: '/user1.png' },
        { sender: 'agent', text: 'Really?', avatarUrl: '/user2.png' },
        { sender: 'user', text: "Yeah, It's really good!", avatarUrl: '/user1.png' },
    ];


    const StatusTag = ({ color, label }: { color: 'positive' | 'negative'; label: string }) => {
        const styles = {
            positive: {
                borderColor: '#00C896',
                color: '#00C896',
                dotColor: '#00C896',
            },
            negative: {
                borderColor: '#FF4C4C',
                color: '#FF4C4C',
                dotColor: '#FF4C4C',
            },
        };

        const currentStyle = styles[color];

        return (
            <Chip
                label={
                    <Box display="flex" alignItems="center" gap={1}>
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: currentStyle.dotColor,
                            }}
                        />
                        {label}
                    </Box>
                }
                variant="outlined"
                sx={{
                    borderColor: currentStyle.borderColor,
                    color: currentStyle.color,
                    fontWeight: 500,
                    fontSize: '14px',
                    borderRadius: '20px',
                    px: 1.5,
                }}
            />
        );
    };

    const chartHistoryHeader = () => {
        return (
            <Box sx={{ mb: 3 }}>
                <Typography sx={{ color: "white", fontWeight: 500, fontSize: "20px" }}>
                    Conversation History
                </Typography>
            </Box>
        )
    }

    const filterChartHistory = () => {
        return (
            <Box
                sx={{
                    mb: 2,
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    bgcolor: '#2a2a33',
                    p: 2,
                    borderRadius: '10px',
                    border: '1px solid #505060',
                    alignItems: 'center',
                }}
            >
                <Select
                    value={agent}
                    displayEmpty
                    onChange={(e) => setAgent(e.target.value)}
                    startAdornment={<PeopleAltOutlinedIcon sx={{ color: '#B8B9C1', mr: 1 }} />}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                bgcolor: '#18181b',
                                color: '#fff',
                                maxHeight: 300,
                                '& .MuiMenuItem-root': { fontSize: 14 },
                                '& .Mui-selected': { bgcolor: '#333 !important' },
                            },
                        },
                    }}
                    sx={{
                        minWidth: 200,
                        height: 36,
                        bgcolor: '#18181b',
                        color: '#B8B9C1',
                        border: '1px solid #444',
                        borderRadius: '8px',
                        '& .MuiSelect-icon': { color: '#fff' },
                    }}
                >
                    <MenuItem value="">
                        <em>Select Agent</em>
                    </MenuItem>
                    {data.map((elem) => (
                        <MenuItem key={elem.person_name} value={elem.person_name}>
                            {elem.person_name}
                        </MenuItem>
                    ))}
                </Select>

                {[{ id: 'from-date', label: 'From Date', value: fromDate, onChange: setFromDate },
                { id: 'to-date', label: 'To Date', value: toDate, onChange: setToDate }].map((field) => (
                    <TextField
                        key={field.id}
                        id={field.id}
                        type="date"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder={field.label}
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            width: 200,
                            bgcolor: '#18181b',
                            border: '1px solid #444',
                            borderRadius: '8px',
                            '& .MuiInputBase-root': {
                                height: 36,
                                borderRadius: '8px',
                                pl: 1,
                            },
                            input: {
                                color: '#fff',
                                p: '10px',
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <label htmlFor={field.id} style={{ cursor: 'pointer' }}>
                                        <CalendarMonthOutlinedIcon sx={{ color: '#ccc', height: 16 }} />
                                    </label>
                                </InputAdornment>
                            ),
                        }}
                    />
                ))}

                <Button
                    variant="contained"
                    onClick={handleSearch}
                    startIcon={<Search />}
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
                    Search
                </Button>
            </Box>

        )
    }

    const numberSearch = () => {
        return (
            <TextField
                fullWidth
                placeholder="Search by phone number..."
                type='number'
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search sx={{ color: '#444' }} />
                        </InputAdornment>
                    )
                }}

                sx={{
                    border: '1px solid #444',
                    borderRadius: "8px",
                    bgcolor: '#18181b',
                    width: 600,
                    '& .MuiInputBase-root': {
                        height: 36,
                        borderRadius: "8px",
                        pl: 1,
                    },
                    input: {
                        color: '#fff',
                        padding: '10px ',
                    },
                    mb: 2,
                }}
            />
        )
    }


    const chartHistoryTable = () => {
        const TableHeaders = ['Customer Name', 'Customer Number', 'Connected By', 'Call Duration', 'Sentiments', 'Action']
        return (
            <TableContainer component={Paper} sx={{ bgcolor: '#1e1e1e' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#43454e' }}>
                            {TableHeaders.map((header) => (
                                <TableCell
                                    key={header}
                                    sx={{
                                        color: '#D9D9DE',
                                        padding: '10px',
                                        lineHeight: 1.8,
                                        fontSize: 12,
                                        fontWeight: 500,
                                        border: 'none',
                                    }}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedData.map((row, index) => {
                            const isEvenRow = index % 2 === 0;
                            const bgColor = isEvenRow ? '#18181b' : '#2a2a33';
                            const sentimentLabel = isEvenRow ? 'Negative' : 'Positive';
                            const sentimentColor = isEvenRow ? 'negative' : 'positive';

                            return (
                                <TableRow key={row.id}>
                                    {[row.person_name, row.phone_number, row.dailer, formatTime(row.call_duration)].map((text, i) => (
                                        <TableCell
                                            key={i}
                                            sx={{
                                                color: '#D9D9DE',
                                                border: 'none',
                                                backgroundColor: bgColor,
                                            }}
                                        >
                                            {index}  {text}
                                        </TableCell>
                                    ))}

                                    <TableCell sx={{ color: '#D9D9DE', border: 'none', backgroundColor: bgColor }}>
                                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                                            <StatusTag label={sentimentLabel} color={sentimentColor} />
                                            <span>🙂 80%</span>
                                        </Box>
                                    </TableCell>

                                    <TableCell sx={{ color: '#EFF7FF', border: 'none', backgroundColor: bgColor }}>
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
                                            endIcon={<Visibility />}
                                            onClick={handleTranscript}
                                        >
                                            View Transcription
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
                                            endIcon={<PlayArrow />}
                                            onClick={handleTranscript}
                                        >
                                            Play Recording
                                        </Button>
                                    </TableCell>

                                    <TranscriptDialog
                                        open={openTranscript}
                                        onClose={() => setOpenTranscript(false)}
                                        audioSrc={row.recording_path}
                                        messages={messages}
                                    />
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }


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
                    borderRadius: '10px',
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
            <Box sx={{ p: 3, backgroundColor: '#0E0E11', color: '#fff', minHeight: '100vh', }}>
                {chartHistoryHeader()}
                {filterChartHistory()}
                <Divider sx={{ mt: 1, bgcolor: '#505060', height: "1px", borderRadius: 1, mb: 2 }} />
                {numberSearch()}
                {chartHistoryTable()}
                {paginationOfTable()}
            </Box>
        </Layout>
    );
};

export default ConversationHistory;
