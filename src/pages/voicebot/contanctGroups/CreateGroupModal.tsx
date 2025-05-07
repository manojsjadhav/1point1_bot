import React, { useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Typography,
    Avatar,
    Box,
} from '@mui/material';
import UploadModal from './UploadModal';
import { CreateContactGroupPayload } from '../../../types';
import { useDispatch } from 'react-redux';
import { createContactGroup, resetContactGroupState } from '../../../redux/nodeSlice/createcontactGroupSlice';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchCallDetails } from '../../../redux/nodeSlice/getCallHistoryByNumberSlice';

interface CreateGroupModalProps {
    open: boolean;
    onClose: () => void;
    // onCreate: (CreateContactGroupPayload: CreateContactGroupPayload) => void;
    isCreateModal: boolean;
    // user_id: string
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ open, onClose, isCreateModal }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { success } = useSelector(
        (state: RootState) => state.createGroup
    );

    const callDetailsState = useSelector(
        (state: RootState) => state.callDetails
    );
    console.log("callDetails", callDetailsState.callDeatails);

    const [groupName, setGroupName] = React.useState('');
    const [contactNumber, setContactNumber] = React.useState('');
    const [previewImage, setPreviewImage] = React.useState<any | null>(null);
    const [openUpload, setOpenUpload] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isCreateModal) {
            const payload: CreateContactGroupPayload = {
                user_id: "1",
                group_name: groupName,
                group_avtar: previewImage.fileName

            };
            await dispatch(createContactGroup(payload));
        } else {
            console.log("Add New Contact");
        }
        onClose()
    };

    useEffect(() => {
        if (success) {
            alert("Group created successfully!");
            dispatch(resetContactGroupState());
            setGroupName("");
        }
    }, [success, dispatch]);


    const handleCallHistory = () => {
        dispatch(fetchCallDetails({ number: "1234567890", userId: "1" }))
    }

    useEffect(() => {
        handleCallHistory()
    }, [])

    return (
        <>
            <Dialog open={open} onClose={onClose} PaperProps={{
                sx: {
                    backgroundColor: '#41414B',
                    borderRadius: '12px',
                    padding: 2,
                    minWidth: 360,
                    boxShadow: "rgba(16, 24, 40, 0.03)"
                }
            }}>
                <DialogTitle sx={{ color: '#FFFFFF', fontSize: 18, fontWeight: 500 }}>
                    {isCreateModal ? "Create New Group" : "Add New Contact"}
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: '#B8B9C1', fontSize: 14, mb: 2, fontWeight: 400 }}>
                        {isCreateModal ? "Add group name and an avatar to create a new group." : "Add a new contact to this group."}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        {previewImage && (
                            <Box mt={2}>
                                <Avatar sx={{ width: 48, height: 48 }} src={previewImage.fileName} />
                            </Box>
                        )}
                        <Button
                            variant="outlined"
                            onClick={() => setOpenUpload(true)}
                            sx={{
                                color: '#fff',
                                borderColor: '#FFF4ED',
                                textTransform: 'none',
                                fontSize: 12,
                                fontWeight: 500,
                                borderRadius: "8px"
                            }}
                        >
                            {isCreateModal ? "Change Avatar" : "Add Profile Picture"}
                        </Button>

                        <UploadModal
                            open={openUpload}
                            onClose={() => setOpenUpload(false)}
                            onBack={() => {
                                console.log('Back button clicked');
                                setOpenUpload(false);
                            }}
                            setPreviewImage={setPreviewImage}
                        />
                    </Box>

                    <Typography sx={{ color: '#fff', fontSize: 14, mb: 1, fontWeight: 500 }}>
                        {isCreateModal ? " Add Group Name" : "Add Contact Name"}
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder={isCreateModal ? "Group name" : "Contact Name"}
                        variant="outlined"
                        size="small"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        sx={{
                            mb: 3,
                            input: { color: '#fff' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#555' },
                                '&:hover fieldset': {
                                    borderColor: '#ff5a1f',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#ff5a1f',
                                },
                            },
                        }}
                    />

                    {!isCreateModal && <>
                        <Typography sx={{ color: '#fff', fontSize: 14, mb: 1, fontWeight: 500 }}>
                            Add Contact Number
                        </Typography>
                        <TextField
                            fullWidth
                            type='number'
                            placeholder={"+91 8888 8888 88"}
                            variant="outlined"
                            size="small"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            sx={{
                                mb: 3,
                                input: {
                                    color: '#fff',
                                    MozAppearance: 'textfield',
                                },
                                '& input[type=number]': {
                                    MozAppearance: 'textfield',
                                },
                                '& input[type=number]::-webkit-outer-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                                '& input[type=number]::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#555' },
                                    '&:hover fieldset': {
                                        borderColor: '#ff5a1f',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ff5a1f',
                                    },
                                },
                            }}
                        />
                    </>
                    }


                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
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
                            onClick={handleSubmit}
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
                            Create
                        </Button>

                    </Box>
                </DialogContent>
            </Dialog>



        </>
    );
};

export default CreateGroupModal;
