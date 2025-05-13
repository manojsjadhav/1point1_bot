import React, { useEffect } from 'react';
import {
    Dialog, DialogContent, DialogTitle, Typography, Box, Button, MenuItem,
    Select, FormControl, Grid
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchContactDetails } from '../../../redux/nodeSlice/getContactDetailsSlice';
import { addBrodCastData } from '../../../services/contactGroupsServices';
import { toast } from 'react-toastify';

const inputSx = {
    bgcolor: '#2a2a33',
    border: '1px solid #B8B9C1',
    borderRadius: '8px',
    '&:hover': {
        borderColor: '#FF5722',
        backgroundColor: '#333344',
    },
    '& .MuiInputBase-root': {
        borderRadius: '8px',
        pl: 1,
        color: '#FF4C4C',
    },
    '& input': {
        color: '#FF4C4C !important',
        padding: '10px',
    },
    '& .MuiInputLabel-root': {
        color: '#B8B9C1',
        opacity: 0.7,
    },
    '& .MuiSvgIcon-root': {
        color: '#B8B9C1',
    },
    '&.Mui-focused .MuiInputLabel-root': {
        opacity: 0,
    },
    '& .MuiPickersOutlinedInput-sectionsContainer': {
        color: '#FF4C4C',
        borderRadius: '8px',
    },
    '& .MuiOutlinedInput-root': {
        bgcolor: '#2a2a33',
        border: '1px solid #B8B9C1',
        borderRadius: '8px',
        color: '#B8B9C1',
        pl: 1,
        '& input': {
            color: '#B8B9C1',
            padding: '10px',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'red',
        },
    },
    '& .MuiPickersInputBase-sectionsContainer': {
        color: '#B8B9C1',
    },
    '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root': {
        backgroundColor: '#2a2a33',
        borderRadius: '8px',
        border: 'unset',
        color: '#FF4C4C',
        paddingLeft: '8px',
        '& input': {
            color: '#FF4C4C',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'unset',
        },
    },
};

const BroadcastModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedGroup = useSelector((state: RootState) => state.groupSlice.selectedGroup);
    const { agents } = useSelector((state: RootState) => state.agents);
    const [agent, setAgent] = React.useState('');
    const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);
    const [time, setTime] = React.useState<dayjs.Dayjs | null>(null);
    const [selectedAgent, setSelectedAgent] = React.useState<any>({});

    const handleBrodCast = () => {
        if (!date || !time || !agent) {
            toast.error("Please fill the all fields.")
            return;
        }

        const finalDateTime = date
            .hour(time.hour())
            .minute(time.minute())
            .second(0)
            .millisecond(0)
            .format('YYYY-MM-DDTHH:mm:ss');

        const payload = {
            id: selectedGroup.id,
            assigned_agent: selectedAgent?.id,
            scheduled_date: finalDateTime,
        };

        addBrodCastData(payload);
        onClose();
    };

    useEffect(() => {
        if (open) {
            setAgent('');
            setDate(null);
            setTime(null);
            setSelectedAgent({});
        }
    }, [open]);

    useEffect(() => {
        if (selectedGroup?.id) {
            dispatch(fetchContactDetails(selectedGroup.id));
        }
    }, [selectedGroup]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    backgroundColor: '#2a2a33',
                    borderRadius: '12px',
                    minWidth: 360,
                    boxShadow: "rgba(16, 24, 40, 0.03)"
                }
            }}
        >
            <DialogTitle sx={{ color: '#FFFFFF', fontSize: 18, fontWeight: 500, padding: "12px 24px" }}>
                Broadcast a Group
            </DialogTitle>

            <DialogContent>
                <Typography sx={{ color: '#B8B9C1', fontSize: 14, mb: 2 }}>
                    Add details to broadcast this group.
                </Typography>

                <Typography sx={{ color: '#fff', fontSize: 14, mb: 1, fontWeight: 500 }}>
                    Select an Agent
                </Typography>

                <FormControl fullWidth size="small">
                    <Select
                        value={agent}
                        onChange={(e) => {
                            setAgent(e.target.value);
                            const agentObj = agents.find((elem) => elem.agent_name === e.target.value);
                            setSelectedAgent(agentObj);
                        }}
                        displayEmpty
                        sx={{
                            mb: 3,
                            backgroundColor: '#2a2a33',
                            color: agent ? '#ffffff' : '#b0b0b5',
                            borderRadius: '8px',
                            '& .MuiSelect-icon': { color: '#b0b0b5' },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ff5a1f' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff5a1f' },
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    maxHeight: 200,
                                    backgroundColor: '#1e1e28',
                                    color: '#fff',
                                },
                            },
                            MenuListProps: { sx: { padding: 0 } },
                        }}
                        renderValue={(selected) =>
                            selected ? selected : <span style={{ color: '#b0b0b5' }}>Select Agent</span>
                        }
                    >
                        <MenuItem value="" disabled>Select Agent</MenuItem>
                        {agents.map((elem, index) => (
                            <MenuItem
                                key={index}
                                value={elem.agent_name}
                                sx={{
                                    backgroundColor: '#1e1e28',
                                    '&:hover': { backgroundColor: '#333' },
                                    '&.Mui-selected': { backgroundColor: '#ff5a1f', color: '#fff' },
                                    '&.Mui-selected:hover': { backgroundColor: '#e04a12' },
                                }}
                            >
                                {elem.agent_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography sx={{ color: '#fff', fontSize: 14, mb: 1, fontWeight: 500 }}>Date</Typography>
                            <DatePicker
                                label={!date ? 'Select Date' : ''}
                                value={date}
                                onChange={(newValue: any) => setDate(newValue)}
                                disablePast
                                slotProps={{ textField: { size: 'small', sx: inputSx } }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography sx={{ color: '#fff', fontSize: 14, mb: 1, fontWeight: 500 }}>Time</Typography>
                            <TimePicker
                                label={!time ? 'Select Time' : ''}
                                value={time}
                                onChange={(newValue: any) => setTime(newValue)}
                                disablePast
                                slotProps={{ textField: { fullWidth: true, size: 'small', sx: inputSx } }}
                            />
                        </Grid>
                    </Grid>
                </LocalizationProvider>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        sx={{
                            borderRadius: "8px",
                            color: '#fff',
                            borderColor: '#555',
                            textTransform: 'none',
                            fontWeight: 500,
                            width: '48%',
                            boxShadow: 'none',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleBrodCast}
                        sx={{
                            bgcolor: '#ff5a1f',
                            color: '#fff',
                            textTransform: 'none',
                            fontWeight: 500,
                            width: '48%',
                            borderRadius: '8px',
                            boxShadow: 'none',
                            '&:active': { bgcolor: '#c64518' },
                        }}
                    >
                        Broadcast
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}; 

export default BroadcastModal;
