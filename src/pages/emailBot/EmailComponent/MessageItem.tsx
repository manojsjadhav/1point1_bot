import { Avatar, Box, Typography, Link } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { MessageItemStyles } from './Style';


const MessageItem = () => {
    return (
        <Box sx={MessageItemStyles.container}>
            {/* Header: Avatar, Name, Date */}
            <Box sx={MessageItemStyles.header}>
                <Box sx={MessageItemStyles.userInfo}>
                    <Avatar
                        alt="John Doe"
                        src="https://randomuser.me/api/portraits/men/10.jpg"
                        sx={MessageItemStyles.avatar}
                    />
                    <Typography sx={MessageItemStyles.userName}>John Doe</Typography>
                </Box>
                <Typography sx={MessageItemStyles.timestamp}>
                    22/06/2024 • 10:30 AM
                </Typography>
            </Box>

            {/* Message Text */}
            <Typography sx={MessageItemStyles.messageText}>
                Embedding Model for SBI bot is experiencing surge in the response from the voice model andshdsds
            </Typography>

            {/* Attachments */}
            <Box sx={MessageItemStyles.attachmentRow}>
                <AttachFileIcon sx={MessageItemStyles.attachmentIcon} />
                <Link underline="hover" sx={MessageItemStyles.attachmentLink}>
                    2 Files attached
                </Link>
            </Box>
        </Box>
    );
};

export default MessageItem;
