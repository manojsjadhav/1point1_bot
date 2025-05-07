import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    Button,
    TextField,
    IconButton,
    Avatar,
    Divider,
    InputBase,
    InputAdornment,
} from '@mui/material';
import { styled } from '@mui/system';
import CallIcon from '@mui/icons-material/Call';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import { Search } from '@mui/icons-material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { useState } from 'react';
import CreateGroupModal from './CreateGroupModal';

const StyledInput = styled(InputBase)(({ theme }) => ({
    background: '#2E2E2E',
    borderRadius: 8,
    padding: '6px 12px',
    color: '#fff',
    width: '100%',
}));

const contactList = Array(5).fill({
    name: 'Chris Doe',
    number: '+91 86 8768 8765',
    avatar: '',
});

const callHistory = [
    { date: 'Today', time: '8:00AM', type: 'Outgoing', duration: '20 mins' },
    { date: '2 May,2024', time: '10:00AM', type: 'Outgoing', duration: '30.6 mins' },
    { date: '2 May,2024', time: '8:00AM', type: 'Incoming', duration: '10 mins' },
    { date: '2 May,2024', time: '11:00AM', type: 'Incoming', duration: '15 mins' },
];

export default function GroupModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [search, setSearch] = useState<string>('');
    const [openAddContactModal, setOpenAddContactModal] = useState(false)

    const handleCreateGroup = (groupName: string) => {
        console.log('New Group:', groupName);
        setOpenAddContactModal(false);
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth PaperProps={{
            sx: {
                backgroundColor: '#2A2A33',
                color: '#fff',
                borderRadius: 2,
                overflow: 'hidden',
            }
        }}>
            <DialogContent sx={{ p: 3 }}>
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Box display="flex" alignContent="center" gap={1}>
                            <Avatar sx={{ width: 26, height: 26 }}>G</Avatar>
                            <Typography fontWeight={500} fontSize={18}>Group A</Typography>
                        </Box>
                        <Typography fontSize={14} color="gray">Group details and call list.</Typography>
                    </Box>

                    <Box display="flex" gap={1}>
                        <Button variant='outlined' endIcon={<UploadFileIcon />} sx={{ bgcolor: '#1F2D20', color: '#16C784', textTransform: 'none', borderColor: "#085D44", borderRadius: "8px" }}>
                            Excel File Upload
                        </Button>
                        <Button variant='outlined' endIcon={<UploadFileIcon />} sx={{ bgcolor: '#2A2A2E', color: '#fff', textTransform: 'none', borderColor: "#4C4D58", borderRadius: "8px" }}>
                            Upload Contacts
                        </Button>
                        <Button onClick={() => setOpenAddContactModal(true)} endIcon={<AddIcon />} sx={{ bgcolor: '#FF5722', color: '#fff', textTransform: 'none', '&:hover': { bgcolor: '#e65100' } }}>
                            Add New
                        </Button>
                    </Box>
                </Box>

                <CreateGroupModal
                    open={openAddContactModal}
                    onClose={() => setOpenAddContactModal(false)}
                    onCreate={handleCreateGroup}
                    isCreateModal={false}
                />


                <Box display="flex" gap={3}>
                    {/* Contacts Section */}
                    <Box flex={2} bgcolor="#2a2a33" p={2} border="1px solid #505060" borderRadius="8px">
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Typography mb={1}>Contacts</Typography>

                            <TextField
                                fullWidth
                                placeholder="Search"
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
                                    width: 400,
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
                        </Box>
                        <Box display="flex" flexDirection="column" border="1px solid #505060" borderRadius="8px" gap={1}>
                            {contactList.map((c, i) => (
                                <Box key={i} display="flex" alignItems="center" justifyContent="space-between" p={1.5} bgcolor="#2a2a33" borderTop={i === 0 ? "none" : "1px solid #505060"}>
                                    <Box display="flex" alignItems="center" gap={2} >
                                        <Avatar />
                                        <Box sx={{ display: "flex", gap: 2 }}>
                                            <Typography fontSize={14}>{c.name}</Typography>
                                            <Typography fontSize={13} color="gray">{c.number}</Typography>
                                        </Box>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                        <Divider sx={{ bgcolor: '#444', height: "40px", width: "1px", mr: 2 }} />
                                        <Button variant="contained" size="small" startIcon={<CallIcon />} sx={{ textTransform: 'none', borderRadius: "25px", backgroundColor: "#067654" }}>
                                            <Typography fontSize={12} fontWeight={500} color='#FFFFFF'>Call</Typography>
                                        </Button>
                                        <IconButton><DeleteIcon sx={{ color: '#fff' }} /></IconButton>
                                        <IconButton><EditIcon sx={{ color: '#fff' }} /></IconButton>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Call History */}
                    <Box flex={1.2} bgcolor="#2a2a33" p={2} border="1px solid #505060" borderRadius="8px">
                        <Typography mb={2}>Call History</Typography>
                        <Box bgcolor="#2a2a33" border="1px solid #505060" borderRadius="8px">
                            {['Today', '2 May,2024'].map(date => (
                                <Box key={date}>
                                    <Typography padding="20px 12px" bgcolor="#41414b" fontSize={13} color="#D9D9DE">{date}</Typography>
                                    {callHistory.filter(ch => ch.date === date).map((entry, idx) => (
                                        <Box key={idx} display="flex" justifyContent="space-between" alignItems="center" padding="20px 12px" bgcolor="#2a2a33" borderRadius={1}>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <PhoneInTalkIcon fontSize="small" />
                                                <Typography fontSize={14} fontWeight={500}>{entry.time}</Typography>
                                            </Box>
                                            <Typography fontSize={14} color="#D9D9DE">{entry.type}, {entry.duration}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* Footer Buttons */}
                <Box display="flex" justifyContent="center" gap={2} mt={3}>
                    <Button variant="outlined" sx={{ width: "220px", color: '#fff', borderColor: '#555' }} onClick={onClose}>Cancel</Button>
                    <Button variant="contained" sx={{ width: "220px", bgcolor: '#FF5722', '&:hover': { bgcolor: '#e64a19' } }}>
                        Save
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

