import React from 'react';
import { Box, Typography, IconButton, Avatar, styled } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Email } from '../../../types';

interface EmailListItemProps {
    email: Email;
    isSelected: boolean;
    onClick: () => void;
    onStar: () => void;
}

const StyledBox = styled(Box)<{ isread: string; isselected: string }>(({ isread, }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    margin: '8px 10px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: "8px",
    backgroundColor: '#2a2a33',
    // backgroundColor: isselected === 'true' ? 'transparent' : '#2a2a33',
    position: 'relative',
    cursor: 'pointer',

    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        left: -6,
        top: 0,
        bottom: 0,
        width: '3px',
        backgroundColor: isread === 'true' ? 'transparent' : '#ff5722',
        // borderRadius: '0 2px 2px 0',
    }
}));

const EmailListItem: React.FC<EmailListItemProps> = ({ email, isSelected, onClick, onStar }) => {
    return (
        <StyledBox
            isread={email.isRead.toString()}
            isselected={isSelected.toString()}
            onClick={onClick}
        >
            <Avatar
                src={email.from.avatar}
                sx={{ width: 36, height: 36, marginRight: 1.5, marginBottom: "25px" }}
            />
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle2" fontSize={14} noWrap sx={{ fontWeight: !email.isRead ? 'bold' : 'normal' }}>
                        {email.from.name}
                    </Typography>
                    <Box color="#D9D9DE" display="flex" alignItems="center" gap={1}>
                        <Typography variant="caption">Inbox</Typography>
                        <Typography variant="caption" sx={{ alignContent: "baseline" }}>&bull;</Typography>
                        <Typography variant="caption">10.02 AM</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography
                        variant="body2"
                        noWrap
                        sx={{ fontWeight: !email.isRead ? 'bold' : 'normal', color: "#D9D9DE", fontSize: "12px" }}
                    >
                        {email.subject}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Typography
                        variant="body2"
                        noWrap
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: '12px',
                            lineHeight: '1.2',
                            color: '#B8B9C1',
                            maxWidth: '90%',
                            whiteSpace: "normal"
                        }}
                    >
                        {email.preview} {email.preview}
                    </Typography>

                    <IconButton
                        size="small"
                        sx={{ p: 0 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onStar();
                        }}
                    >
                        {email.isStarred ? (
                            <StarIcon fontSize="small" sx={{ color: '#ff9800' }} />
                        ) : (
                            <StarBorderIcon fontSize="small" sx={{ color: '#B8B9C1' }} />
                        )}
                    </IconButton>
                </Box>
            </Box>
        </StyledBox>
    );
};

export default EmailListItem;