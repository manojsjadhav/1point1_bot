import { Avatar, Box, Link, Typography } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { MessageItemStyles } from './Style';
import { formatDate, formatTo12HourTime } from '../../../utils';


const MessageItem = (emailDetail: any) => {
    return (
        <Box sx={MessageItemStyles.container}>
            {/* Header: Avatar, Name, Date */}
            <Box sx={MessageItemStyles.header}>
                <Box sx={MessageItemStyles.userInfo}>
                    <Avatar
                        alt="John Doe"
                        sx={MessageItemStyles.avatar}
                    >{emailDetail?.emailDetail?.name.charAt(0).toUpperCase()}</Avatar>
                    <Typography sx={MessageItemStyles.userName}>{emailDetail?.emailDetail?.name}</Typography>
                </Box>
                <Typography sx={MessageItemStyles.timestamp}>
                    {formatDate(emailDetail?.emailDetail?.ticket_created_at)} • {formatTo12HourTime(emailDetail?.emailDetail?.ticket_created_at)}
                </Typography>
            </Box>

            {/* Message Text */}
            <Typography sx={MessageItemStyles.messageText}>
                {emailDetail?.emailDetail?.message}
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
