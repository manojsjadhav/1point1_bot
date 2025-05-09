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
    InputAdornment,
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import { Search } from '@mui/icons-material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import CreateGroupModal from './CreateGroupModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../../redux/nodeSlice/deleteContactSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchContactDetails, searchContact } from '../../../redux/nodeSlice/getContactDetailsSlice';
import { setSelectedGroup } from '../../../redux/nodeSlice/groupSlice';
import { setSelectedModalName } from '../../../redux/nodeSlice/modolNameSlice';
import { uploadFile } from '../../../redux/nodeSlice/uploadFileSlice';
import { fetchCallDetails } from '../../../redux/nodeSlice/getCallHistoryByNumberSlice';
import CustomLoader from '../../CustomLoader';
import NoData from '../../../components/NoData';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function GroupModal({ open, onClose }: { open: boolean; onClose: () => void, }) {
    const dispatch = useDispatch<AppDispatch>();
    const selectedGroup = useSelector((state: RootState) => state.groupSlice.selectedGroup);
    const contactState = useSelector((state: RootState) => state && state.contactDetails);
    const contactDetails = contactState?.contactsDeatails || [];
    const loading = contactState?.loading;

    const callDetails = useSelector((state: RootState) => state.callDetails);
    const callDetail = callDetails.callDeatails;
    const callDate = callDetail[0]?.created_date;


    const isToday = (inputDateString: string): boolean => {
        const inputDate = new Date(inputDateString);
        const today = new Date();

        return (
            inputDate.getFullYear() === today.getFullYear() &&
            inputDate.getMonth() === today.getMonth() &&
            inputDate.getDate() === today.getDate()
        );
    };

    const result = isToday(callDate);

    const [search, setSearch] = useState<string>('');
    const [openAddContactModal, setOpenAddContactModal] = useState(false)
    const [isClickedRowId, setIsClickedRowId] = useState<any | null>(null)
    const inputRef = useRef<HTMLInputElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleContactsDelete = async (data: any) => {
        try {
            await dispatch(deleteContact(data.id)).unwrap();
            await dispatch(fetchContactDetails(data.group_id));
            // alert("Contact deleted successfully.");
        } catch (error) {
            alert("Failed to delete contact.");
        }
    };

    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    };

    const formatTime = (isoDate: string): string => {
        const date = new Date(isoDate);
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const formattedHour = hours % 12 || 12;
        const amPm = hours >= 12 ? 'PM' : 'AM';
        return `${formattedHour}:${minutes}${amPm}`;
    };

    const callsHistoryDate = formatDate(callDate);

    const handleOpenModal = (Row?: any) => {

        if (Row) {
            dispatch(setSelectedGroup(Row));
            dispatch(setSelectedModalName("Edit_Contacts_Name"));
        } else {
            dispatch(setSelectedModalName("Add_New_Contact_Name"));
        }
        setOpenAddContactModal(true);
    };

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && selectedGroup?.id) {
            try {
                await dispatch(uploadFile({
                    file,
                    group_id: selectedGroup.id,
                    user_id: selectedGroup?.user_id,
                })).unwrap();
                dispatch(fetchContactDetails(selectedGroup?.id));
            } catch (err: any) {
                alert(err?.message || "Failed to upload contacts.");
            }
        }
    };

    const handleCallHistory = async (rowData: any) => {
        setIsClickedRowId(rowData.id)
        await dispatch(fetchCallDetails({ number: rowData?.phone_number, userId: rowData?.user_id }));
    }

    const filteredData = useMemo(() => {
        return contactDetails.filter((item: any) =>
            item.person_name?.toLowerCase().includes(search.toLowerCase())
        );
    }, [contactDetails, search]);


    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            dispatch(searchContact({ query: search.trim() }));
            searchInputRef.current?.focus();
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search, dispatch]);



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
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Box display="flex" alignContent="center" gap={1}>
                            {selectedGroup?.group_avtar ? <Avatar sx={{ width: 26, height: 26 }} src={selectedGroup?.group_avtar} /> :
                                <Avatar sx={{ width: 26, height: 26 }}>{selectedGroup?.group_name.str.charAt(0).toUpperCase()}</Avatar>}
                            <Typography fontWeight={500} fontSize={18}> {selectedGroup?.group_name}</Typography>
                        </Box>
                        <Typography fontSize={14} color="gray">Group details and call list.</Typography>
                    </Box>

                    <Box display="flex" gap={1}>
                        <input
                            type="file"
                            accept=".csv"
                            style={{ display: 'none' }}
                            ref={inputRef}
                            onChange={handleFileChange}
                        />
                        <Button
                            variant='outlined'
                            endIcon={<UploadFileIcon />}
                            sx={{
                                bgcolor: '#1F2D20',
                                color: '#16C784',
                                textTransform: 'none',
                                borderColor: "#085D44",
                                borderRadius: "8px"
                            }}
                            onClick={handleButtonClick}
                        >
                            Upload Contacts
                        </Button>
                        <Button onClick={() => handleOpenModal()} endIcon={<AddIcon />} sx={{ bgcolor: '#FF5722', color: '#fff', textTransform: 'none', '&:hover': { bgcolor: '#e65100' } }}>
                            Add New
                        </Button>
                    </Box>
                </Box>

                <CreateGroupModal
                    open={openAddContactModal}
                    onClose={() => setOpenAddContactModal(false)}
                />

                {!loading ? <>
                    <Box display="flex" gap={3}>
                        <Box flex={2} bgcolor="#2a2a33" p={2} border="1px solid #505060" borderRadius="8px">
                            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", }}>
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

                            {filteredData.length ? <Box
                                display="flex"
                                flexDirection="column"
                                border="1px solid #505060"
                                borderRadius="8px"
                                sx={{
                                    maxHeight: '400px',
                                    overflowY: 'auto',
                                    pr: 1,
                                    '&::-webkit-scrollbar': {
                                        width: 0,
                                        height: 0,
                                    },
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                }}
                            >
                                {filteredData.map((c, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            "&:hover": { backgroundColor: "#4c4d58" },
                                            borderTop: i === 0 ? "none" : "1px solid #505060",
                                        }}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        p={2}
                                        bgcolor="#2a2a33"
                                        onClick={() => handleCallHistory(c)}
                                    >
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Avatar />
                                            <Box display="flex" gap={2}>
                                                <Typography fontSize={14}>{c.person_name}</Typography>
                                                <Typography fontSize={13} color="gray">{c.phone_number}</Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                            <Divider sx={{ bgcolor: '#444', height: "40px", width: "1px", mr: 2 }} />
                                            <Button variant="contained" size="small" startIcon={<CallIcon />} sx={{ textTransform: 'none', borderRadius: "25px", backgroundColor: "#067654" }}>
                                                <Typography fontSize={12} fontWeight={500} color='#FFFFFF'>Call</Typography>
                                            </Button>
                                            <IconButton onClick={() => handleContactsDelete(c)}><DeleteIcon sx={{ color: '#fff' }} /></IconButton>
                                            <IconButton onClick={() => handleOpenModal(c)}><EditIcon sx={{ color: '#fff' }} /></IconButton>
                                        </Box>
                                    </Box>
                                ))}
                            </Box> : <NoData />}
                        </Box>

                        {isClickedRowId &&
                            <Box flex={1.2} bgcolor="#2a2a33" p={2} border="1px solid #505060" borderRadius="8px">
                                <Typography mb={2}>Call History</Typography>
                                <Box bgcolor="#2a2a33" border="1px solid #505060" borderRadius="8px">
                                    {loading ? <CustomLoader /> : callDetail.length ? [result ? 'Today' : callsHistoryDate].map(date => (
                                        <Box key={date}>
                                            <Typography padding="20px 12px" bgcolor="#41414b" fontSize={13} color="#D9D9DE">{date}</Typography>
                                            {callDetail
                                                .filter(ch => formatDate(ch.created_date) === date)
                                                .map((entry, idx) => (
                                                    <Box
                                                        key={idx}
                                                        display="flex"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        padding="20px 12px"
                                                        bgcolor="#2a2a33"
                                                        borderRadius={1}
                                                    >
                                                        <Box display="flex" alignItems="center" gap={1}>
                                                            <PhoneInTalkIcon fontSize="small" />
                                                            <Typography fontSize={14} fontWeight={500}>
                                                                {formatTime(entry.created_date)}
                                                            </Typography>
                                                        </Box>
                                                        <Typography fontSize={14} color="#D9D9DE">
                                                            Outgoing, {entry.call_duration} Mins
                                                        </Typography>
                                                    </Box>
                                                ))}
                                        </Box>
                                    )) : <NoData />}
                                </Box>
                            </Box>}
                    </Box>

                    <Box display="flex" justifyContent="center" gap={2} mt={3}>
                        <Button variant="outlined" sx={{ width: "220px", color: '#fff', borderColor: '#555' }} onClick={onClose}>Cancel</Button>
                        <Button variant="contained" sx={{ width: "220px", bgcolor: '#FF5722', '&:hover': { bgcolor: '#e64a19' } }}>
                            Save
                        </Button>
                    </Box>
                </> : <CustomLoader />}
            </DialogContent>
        </Dialog >
    );
}
