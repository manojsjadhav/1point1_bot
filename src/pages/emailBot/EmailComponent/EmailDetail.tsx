import React from 'react';
import {
    Box, Typography
} from '@mui/material';
import ChatInputBar from './ChatInputBar';
import NoData from '../../../components/NoData';
import EmailHeader from './EmailHeader';
import MessageItem from './MessageItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { formatDate, formatMessageDate } from '../../../utils';

interface EmailDetailProps {
    email: any | null;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ email }) => {
    const conversationsById = useSelector((state: RootState) => state.emailConversation.conversationsById);

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
                {conversationsById.map((elem) => {
                    return (
                        <>
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
                                    {formatMessageDate(email.mailReceiveAt)} ,{formatDate(email.mailReceiveAt)}
                                </Typography>
                            </Box>
                            <MessageItem emailDetail={elem} />
                        </>
                    )
                })}
            </Box>

            <Box sx={{ flexShrink: 0 }}>
                <ChatInputBar />
            </Box>
        </Box>
    );
};

export default EmailDetail;