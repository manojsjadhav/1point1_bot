import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField, InputAdornment } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import EmailListItem from './EmailListItem';
import { EmailConversation } from '../../../types';
import { Search } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { fetchEmailByTikectIdConversations } from '../../../redux/nodeSlice/emailSlice';

interface EmailListProps {
    conversations: EmailConversation[];
    onSelectEmail: (email: any) => void;
}

const EmailList: React.FC<EmailListProps> = ({
    conversations,
    onSelectEmail,
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const [search, setSearch] = useState<string>('');


    const filteredEmails = conversations.filter(email =>
        email.subject?.toLowerCase().includes(search.toLowerCase()) ||
        email.customerMail?.toLowerCase().includes(search.toLowerCase()) ||
        email.message?.toLowerCase().includes(search.toLowerCase())
    );

    const handleOnSelectEmail = async (selectedMail: any) => {
        await dispatch(fetchEmailByTikectIdConversations(selectedMail.ticketno))
        onSelectEmail(selectedMail)
    }


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                backgroundColor: '#18181b',
                borderRadius: 1,
                border: '1px solid #41414B',
            }}
        >
            <Box sx={{
                p: 1,
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <TextField
                    fullWidth
                    placeholder="Search chat..."
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
                        '& .MuiInputBase-root': {
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
                    }}
                />

                <IconButton size="small" sx={{ p: "10px", bgcolor: "#41414B", borderRadius: "8px" }}>
                    <FilterListIcon sx={{ color: '#B8B9C1' }} />
                </IconButton>
            </Box>

            <Box
                sx={{
                    overflowY: 'auto',
                    flex: '1 1 auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                {filteredEmails.length > 0 ? (
                    filteredEmails.map(email => (

                        <div onClick={() => handleOnSelectEmail(email)}>
                            <EmailListItem
                                key={email.id}
                                email={email}
                            />

                        </div>
                    ))
                ) : (
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            No emails found
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default EmailList;