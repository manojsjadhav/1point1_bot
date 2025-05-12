import React, { useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    Box,
    Button,
    MenuItem,
    Select,
    FormControl,
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';

import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchContactDetails } from '../../../redux/nodeSlice/getContactDetailsSlice';
import { useSelector } from 'react-redux';
import { addBrodCastData } from '../../../services/contactGroupsServices';



const BroadcastModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedGroup = useSelector((state: RootState) => state.groupSlice.selectedGroup);
    const contactState = useSelector((state: RootState) => state && state.contactDetails);
    const contactDetails = contactState?.contactsDeatails || [];

    const [agent, setAgent] = React.useState('');
    const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);

    const [time, setTime] = React.useState<dayjs.Dayjs | null>(null);
    const [selectedAgent, setSelectedAgent] = React.useState<any>({});

    console.log("date===", selectedAgent?.group_id);

    const handleBrodCast = () => {
        if (!date || !time) {
            alert("Date or Time not selected");
            return;
        }

        // Extract date parts
        const finalDateTime = date
            .hour(time.hour())
            .minute(time.minute())
            .second(0)
            .millisecond(0)
            .format('YYYY-MM-DDTHH:mm:ss');

        console.log("Payload datetime:", finalDateTime);

        const payload = {
            id: selectedAgent.id,
            scheduled_date: finalDateTime,
            assigned_agent: selectedAgent?.group_id,
        };

        console.log("Payload to be sent:", payload);

        addBrodCastData(payload)
        onClose()
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
        console.log("selectedGroup:", selectedGroup);
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
                <Typography sx={{ color: '#B8B9C1', fontSize: 14, mb: 2, fontWeight: 400 }}>
                    Add details to broadcast this group.
                </Typography>

                <Typography sx={{ color: '#fff', fontSize: 14, mb: 1, fontWeight: 500 }}>
                    Select an Agent
                </Typography>

                <FormControl fullWidth size="small">
                    <Select
                        value={agent}
                        onChange={(e) => {
                            setAgent(e.target.value)
                            const selectedContact = e.target.value;
                            const agentObj = contactDetails.find((elem) => elem.person_name === selectedContact);
                            setSelectedAgent(agentObj);
                        }}

                        displayEmpty
                        sx={{
                            mb: 3,
                            backgroundColor: '#2a2a33',
                            color: agent ? '#ffffff' : '#b0b0b5',
                            borderRadius: '8px',
                            '& .MuiSelect-icon': {
                                color: '#b0b0b5',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#555',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ff5a1f',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ff5a1f'
                            },
                        }}

                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    maxHeight: 200, // Fix height and make it scrollable
                                    backgroundColor: '#1e1e28', // Dropdown background
                                    color: '#fff', // Text color
                                },
                            },
                            MenuListProps: {
                                sx: {
                                    padding: 0, // Optional: remove extra padding
                                },
                            },
                        }}
                        renderValue={(selected) => {
                            if (!selected) {
                                return <span style={{ color: '#b0b0b5' }}>Select Agent</span>;
                            }
                            return selected;
                        }}
                    >
                        <MenuItem value="" disabled>
                            Select Agent
                        </MenuItem>
                        {contactDetails.map((elem, index) => (
                            <MenuItem
                                key={index}
                                value={elem.person_name}
                                sx={{
                                    backgroundColor: '#1e1e28',
                                    '&:hover': {
                                        backgroundColor: '#333',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: '#ff5a1f',
                                        color: '#fff',
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: '#e04a12',
                                    },
                                }}
                            >
                                {elem.person_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography sx={{ color: '#fff', fontSize: 14, mb: 1, fontWeight: 500 }}>
                                Date
                            </Typography>
                            <DatePicker
                                label={!date ? 'Select Date' : ''}
                                value={date}
                                onChange={(newValue: any) => setDate(newValue)}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        sx: {
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


                                            // checking
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
                                                    borderColor: 'unset', // removes blue border on focus
                                                },
                                            },
                                        }
                                    },
                                }}
                            />
                        </Grid>

                        {/* Time Picker */}
                        <Grid item xs={6}>
                            <Typography sx={{ color: '#fff', fontSize: 14, mb: 1, fontWeight: 500 }}>
                                Time
                            </Typography>
                            <TimePicker
                                label={!time ? 'Select Time' : ''}
                                value={time}
                                onChange={(newValue: any) => setTime(newValue)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        size: 'small',
                                        sx: {
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


                                            // checking
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
                                        }
                                    },
                                }}
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
                            '&:active': {
                                bgcolor: '#c64518',
                            },
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
