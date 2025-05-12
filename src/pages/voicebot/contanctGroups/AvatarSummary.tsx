import { Avatar, Box, styled } from '@mui/material';

const OverlapBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        fontSize: 14,
        // border: '2px solid #1e1e22',
        marginLeft: -8,
        backgroundColor: '#fa571d',
    },
    '& .MuiAvatar-root:first-of-type': {
        marginLeft: 0,
    },
});

const AvatarSummary = ({
    totalCount,
    visibleAvatars = [
        'https://randomuser.me/api/portraits/men/32.jpg',
        'https://randomuser.me/api/portraits/men/45.jpg',
        'https://randomuser.me/api/portraits/men/58.jpg',
    ],
}: {
    totalCount: number;
    visibleAvatars?: string[];
}) => {
    const visibleCount = visibleAvatars.length;
    const remaining = totalCount - visibleCount;

    return (
        <OverlapBox>
            {totalCount !== 0 && visibleAvatars.map((url, index) => (
                <Avatar key={index} alt={`User ${index}`} src={url} />
            ))}
            {remaining > 0 && (
                <Avatar
                    sx={{
                        bgcolor: '#FF5722',
                        color: '#fff',
                    }}
                >
                    {`${remaining}+`}
                </Avatar>
            )
            }
        </OverlapBox >
    );
};

export default AvatarSummary;
