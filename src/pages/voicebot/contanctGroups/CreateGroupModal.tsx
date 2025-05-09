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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';

import {
    createContactGroup,
    resetContactGroupState
} from '../../../redux/nodeSlice/createcontactGroupSlice';
import { addNewContact } from '../../../redux/nodeSlice/addNewContactSlice';
import { editContactDetails, editContactGroups } from '../../../services/contactGroupsServices';
import { fetchGroups } from '../../../redux/nodeSlice/getContactGroupSlice';
import { fetchContactDetails } from '../../../redux/nodeSlice/getContactDetailsSlice';

interface CreateGroupModalProps {
    open: boolean;
    onClose: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ open, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { success } = useSelector((state: RootState) => state.createGroup);
    const { auth } = useSelector((state: RootState) => state);
    const user_id = auth?.response?.user_id;
    const selectedGroup = useSelector((state: RootState) => state.groupSlice.selectedGroup);
    const selectedmodalName = useSelector((state: RootState) => state.modal.modalName);

    const isEditContact = selectedmodalName === "Edit_Contacts_Name";
    const isAddContact = selectedmodalName === "Add_New_Contact_Name";
    const isAddGroup = selectedmodalName === "Add_New_Group_Name";
    const isEditGroup = selectedmodalName === "Edit_Group_Name";

    const [groupName, setGroupName] = React.useState("");
    const [contactNumber, setContactNumber] = React.useState('');
    const [previewImage, setPreviewImage] = React.useState<any | null>(null);
    const [openUpload, setOpenUpload] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!groupName.trim()) {
            alert((isAddGroup || isEditGroup) ? "Group name is required." : "Contact name is required.");
            return;
        }

        if ((isAddContact || isEditContact) && !contactNumber.trim()) {
            alert("Contact number is required.");
            return;
        }

        if (isAddGroup) {
            const payload: CreateContactGroupPayload = {
                user_id,
                group_name: groupName,
                group_avtar: previewImage?.fileName || '',
                formated_number: selectedGroup?.formated_number || "+123"
            };
            await dispatch(createContactGroup(payload));

            await dispatch(fetchGroups(user_id));
        } else if (isEditGroup) {
            await editContactGroups({
                group_name: groupName,
                group_avtar: previewImage?.fileName || selectedGroup.group_avtar,
                user_id: selectedGroup.id,
                formated_number: selectedGroup?.formated_number || "+123"
            });
            await dispatch(fetchGroups(user_id));
        } else if (isAddContact) {
            await dispatch(addNewContact({
                user_id,
                group_id: selectedGroup?.id,
                person_name: groupName,
                phone_number: contactNumber,
                formated_number: contactNumber
            }));
            await dispatch(fetchContactDetails(selectedGroup?.id));

        } else if (isEditContact) {
            await editContactDetails({
                user_id: selectedGroup.id,
                person_name: groupName,
                phone_number: contactNumber,
                formated_number: selectedGroup?.formated_number
            })
            await dispatch(fetchContactDetails(selectedGroup?.group_id));
        }


        onClose();
    };

    useEffect(() => {
        if (success) {
            alert("Group created successfully!");
            dispatch(resetContactGroupState());
            setGroupName("");
        }
    }, [success, dispatch]);

    useEffect(() => {
        if ((isEditContact || isEditGroup) && selectedGroup) {
            setGroupName(selectedGroup.group_name || selectedGroup.person_name || '');
            setContactNumber(selectedGroup.phone_number || '');
            setPreviewImage({ fileName: selectedGroup.group_avtar });
        }
    }, [isAddContact, isEditContact, isEditGroup, selectedGroup]);

    useEffect(() => {
        if (!open) {
            setGroupName('');
            setContactNumber('');
            setPreviewImage(null);
        }
    }, [open]);

    useEffect(() => {
        dispatch(fetchContactDetails(selectedGroup?.id));
    }, [dispatch]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    backgroundColor: '#41414B',
                    borderRadius: '12px',
                    padding: 2,
                    minWidth: 360,
                    boxShadow: "rgba(16, 24, 40, 0.03)"
                }
            }}
        >
            <DialogTitle sx={{ color: '#FFFFFF', fontSize: 18, fontWeight: 500 }}>
                {isAddGroup && "Create New Group"}
                {isEditGroup && "Edit Group"}
                {isAddContact && "Add New Contact"}
                {isEditContact && "Edit Contact"}
            </DialogTitle>

            <DialogContent>
                <Typography sx={{ color: '#B8B9C1', fontSize: 14, mb: 2, fontWeight: 400 }}>
                    {(isAddGroup || isEditGroup)
                        ? "Add group name and an avatar to create or update a group."
                        : "Add contact name and number to create or edit a contact."}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box mt={2}>
                        <Avatar sx={{ width: 48, height: 48 }} src={"previewImage.png"} />
                    </Box>
                    {/* )} */}
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
                        {previewImage ? "Change Avatar" : "Add Profile Picture"}
                    </Button>

                    <UploadModal
                        open={openUpload}
                        onClose={() => setOpenUpload(false)}
                        onBack={() => setOpenUpload(false)}
                        setPreviewImage={setPreviewImage}
                    />
                </Box>

                <Typography sx={{ color: '#fff', fontSize: 14, mb: 1, fontWeight: 500 }}>
                    {(isAddGroup || isEditGroup) ? "Add Group Name" : "Add Contact Name"}
                </Typography>
                <TextField
                    fullWidth
                    placeholder={(isAddGroup || isEditGroup) ? "Group Name" : "Contact Name"}
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

                {(isAddContact || isEditContact) && (
                    <>
                        <Typography sx={{ color: '#fff', fontSize: 14, mb: 1, fontWeight: 500 }}>
                            Add Contact Number
                        </Typography>
                        <TextField
                            fullWidth
                            type="number"
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
                )}

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
                        {(isEditGroup || isEditContact) ? "Update" : "Create"}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CreateGroupModal;
