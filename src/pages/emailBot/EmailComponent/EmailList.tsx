import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField, InputAdornment } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import EmailListItem from './EmailListItem';
import { Email } from '../../../types';
import { Search } from '@mui/icons-material';

interface EmailListProps {
    emails: Email[];
    selectedEmail: Email | null;
    onSelectEmail: (email: Email) => void;
    onStarEmail: (emailId: string) => void;
}

const EmailList: React.FC<EmailListProps> = ({
    emails,
    selectedEmail,
    onSelectEmail,
    onStarEmail,
}) => {
    const [search, setSearch] = useState<string>('');


    const filteredEmails = emails.filter(email =>
        email.subject.toLowerCase().includes(search.toLowerCase()) ||
        email.from.name.toLowerCase().includes(search.toLowerCase()) ||
        email.preview.toLowerCase().includes(search.toLowerCase())
    );

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
                        // mb: 2,
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
                        <EmailListItem
                            key={email.id}
                            email={email}
                            isSelected={selectedEmail?.id === email.id}
                            onClick={() => onSelectEmail(email)}
                            onStar={() => onStarEmail(email.id)}
                        />
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