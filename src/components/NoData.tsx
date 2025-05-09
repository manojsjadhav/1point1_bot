import React from 'react';
import { Box, Typography } from '@mui/material';
import NoDataImage from '../assets/NoData.svg';
const NoData = () => {
    return (
        <Box
            sx={{
                height: '300px',
                width: '100%',
                border: '1px solid #333',
                borderRadius: '8px',
                backgroundColor: '#1a1a1d',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <img src={NoDataImage} alt="No Data" width={60} height={60} />
            <Typography variant="body2" color="gray" mt={1}>
                No Data
            </Typography>
        </Box>
    );
};

export default NoData;
