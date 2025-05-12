import React from 'react';
import {
    Box, Typography
} from '@mui/material';
import { Email } from '../../../types';
import ChatInputBar from './ChatInputBar';
import NoData from '../../../components/NoData';
import EmailHeader from './EmailHeader';
import MessageItem from './MessageItem';

interface EmailDetailProps {
    email: Email | null;
    onMarkAsRead: (emailId: string) => void;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ email, onMarkAsRead }) => {
    console.log("onMarkAsRead", onMarkAsRead);

    if (!email) {
        return (
            <NoData />
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                bgcolor: '#2a2a33',
                borderRadius: 1,
                border: '1px solid #41414b',
                overflow: 'hidden',
            }}
        >
            <Box sx={{ flexShrink: 0 }}>
                <EmailHeader email={email} />
            </Box>

            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                <MessageItem />
                <MessageItem />
                <Box
                    sx={{
                        bgcolor: '#2c2c32',
                        px: 2,
                        py: 0.5,
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 13,
                            color: '#b0b0b5',
                        }}
                    >
                        Yesterday
                    </Typography>
                </Box>
                <MessageItem />
            </Box>

            {/* Fixed Input Bar */}
            <Box sx={{ flexShrink: 0 }}>
                <ChatInputBar />
            </Box>
        </Box>
    );
};

export default EmailDetail;