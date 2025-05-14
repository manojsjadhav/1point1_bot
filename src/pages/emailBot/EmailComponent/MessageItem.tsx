import { Avatar, Box, Link, Typography } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { MessageItemStyles } from './Style';
import { formatDate, formatTo12HourTime } from '../../../utils';


const MessageItem = (emailDetail: any) => {
    let rawAttachments = emailDetail.emailDetail?.attachments;
    let attachmentsArray = [];

    if (typeof rawAttachments === 'string') {
        try {
            attachmentsArray = JSON.parse(rawAttachments.replace(/'/g, '"')); 
        } catch (e) {
            console.error('Invalid JSON string in attachments:', e);
        }
    } else if (Array.isArray(rawAttachments)) {
        attachmentsArray = rawAttachments;
    }


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
            {attachmentsArray?.length > 1 && <Box sx={MessageItemStyles.attachmentRow}>
                <AttachFileIcon sx={MessageItemStyles.attachmentIcon} />
                <Link underline="hover" sx={MessageItemStyles.attachmentLink}>
                    {attachmentsArray?.length} Files attached
                </Link>
            </Box>}
        </Box>
    );
};

export default MessageItem;
