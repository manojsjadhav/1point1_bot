import React from 'react';
import { Box, Typography, IconButton, Avatar, styled } from '@mui/material';
// import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { formatTo12HourTime } from '../../../utils';
import PartialHtmlMessage from './PartialHtmlMessage';

// const StyledBox = styled(Box)<{ isselected: string }>(({ isselected }) => ({
const StyledBox = styled(Box)(() => ({
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
        // backgroundColor: isread === 'true' ? 'transparent' : '#ff5722',
        // borderRadius: '0 2px 2px 0',
    }
}));

const EmailListItem: React.FC<any> = ({ email }) => {

    return (
        <StyledBox
        >
            <Avatar
                sx={{ width: 36, height: 36, marginRight: 1.5, marginBottom: "25px" }}
            >
                {email?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle2" fontSize={14} noWrap sx={{ fontWeight: 'normal' }}>
                        {email?.name}
                    </Typography>
                    <Box color="#D9D9DE" display="flex" alignItems="center" gap={1}>
                        <Typography variant="caption">Inbox</Typography>
                        <Typography variant="caption" sx={{ alignContent: "baseline" }}>&bull;</Typography>
                        <Typography variant="caption">{formatTo12HourTime(email.mailReceiveAt)}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography
                        variant="body2"
                        noWrap
                        sx={{ fontWeight: 'normal', color: "#D9D9DE", fontSize: "12px" }}
                    >
                        {email.subject}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                        {/* {email.message ? email.message : " "} */}
                        <PartialHtmlMessage html={email.message} />
                    </Typography>

                    <IconButton
                        size="small"
                        sx={{ p: 0 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            // onStar();
                        }}
                    >
                        {/* {email.isStarred ? (
                            <StarIcon fontSize="small" sx={{ color: '#ff9800' }} />
                        ) : (
                            <StarBorderIcon fontSize="small" sx={{ color: '#B8B9C1' }} />
                        )} */}
                        <StarBorderIcon fontSize="small" sx={{ color: '#B8B9C1' }} />
                    </IconButton>
                </Box>
            </Box>
        </StyledBox>
    );
};

export default EmailListItem;