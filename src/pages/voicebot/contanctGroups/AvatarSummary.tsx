import { Avatar, Box, styled } from '@mui/material';

const OverlapBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        fontSize: 14,
        marginLeft: -8,
    },
    '& .MuiAvatar-root:first-of-type': {
        marginLeft: 0,
    },
});

const AvatarSummary = ({
    agents
}: {
    agents: any[]
}) => {
    const visibleCount = 3;
    const totalCount = agents.length;
    const remaining = totalCount - visibleCount;

    return (
        <OverlapBox>
            {totalCount !== 0 && agents.slice(0, 3).map((elem, index) => (
                <Avatar key={index} alt={`User ${index}`}>{elem.agent_name.charAt(0).toUpperCase()}</Avatar>
            ))}
            {remaining > 0 && (
                <Avatar
                    sx={{
                        bgcolor: '#FF5722',
                        color: '#fff',
                        backgroundColor: '#fa571d',
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
