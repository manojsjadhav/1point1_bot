import { Avatar, Box, Link, Typography } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { MessageItemStyles } from './Style';
import { formatDate, formatTo12HourTime } from '../../../utils';
import DOMPurify from 'dompurify';

const MessageItem = ({ emailDetail }: { emailDetail: any }) => {
    const rawAttachments = emailDetail?.attachments;
    const attachmentsArray: any[] = [];

    const sanitizedHtml = DOMPurify.sanitize(emailDetail?.message);

    if (typeof rawAttachments === 'string') {
        try {
            attachmentsArray.push(...JSON.parse(rawAttachments.replace(/'/g, '"')));
        } catch (e) {
            console.error('Invalid JSON string in attachments:', e);
        }
    } else if (Array.isArray(rawAttachments)) {
        attachmentsArray.push(...rawAttachments);
    }

    return (
        <Box sx={MessageItemStyles.container}>
            <Box sx={MessageItemStyles.header}>
                <Box sx={MessageItemStyles.userInfo}>
                    <Avatar alt={emailDetail.name} sx={MessageItemStyles.avatar}>
                        {emailDetail.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography sx={MessageItemStyles.userName}>
                        {emailDetail.name}
                    </Typography>
                </Box>
                <Typography sx={MessageItemStyles.timestamp}>
                    {formatDate(emailDetail.ticket_created_at)} • {formatTo12HourTime(emailDetail.ticket_created_at)}
                </Typography>
            </Box>

            {/* Message Text */}
            <Box sx={MessageItemStyles.messageText}>
                <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
            </Box>

            {/* Attachments */}
            {attachmentsArray.length > 0 && (
                <Box sx={MessageItemStyles.attachmentRow}>
                    <AttachFileIcon sx={MessageItemStyles.attachmentIcon} />
                    <Link underline="hover" sx={MessageItemStyles.attachmentLink}>
                        {attachmentsArray.length} File{attachmentsArray.length > 1 ? 's' : ''} attached
                    </Link>
                </Box>
            )}
        </Box>
    );
};

export default MessageItem;
