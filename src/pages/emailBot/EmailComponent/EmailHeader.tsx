import { Box, Typography, Button, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FlagIcon from '@mui/icons-material/Flag';
import { EmailHeaderStyles } from './Style';

const EmailHeader = ({ email }: { email: { subject: string; id: string } }) => {
    return (
        <Box sx={EmailHeaderStyles.container}>
            {/* Left Section */}
            <Box sx={EmailHeaderStyles.leftSection}>
                <Box sx={EmailHeaderStyles.subjectRow}>
                    <Typography variant="subtitle1" sx={EmailHeaderStyles.subject}>
                        {email.subject}
                    </Typography>
                    <Typography variant="body2" sx={EmailHeaderStyles.emailId}>
                        &lt;{email.id}&gt;
                    </Typography>
                </Box>
                <Box sx={EmailHeaderStyles.tagRow}>
                    <Typography variant="body2" sx={EmailHeaderStyles.tagText}>
                        Technical Problem
                    </Typography>
                    <FlagIcon sx={EmailHeaderStyles.flagIcon} />
                </Box>
            </Box>

            {/* Right Section */}
            <Box sx={EmailHeaderStyles.rightSection}>
                <Button
                    variant="contained"
                    startIcon={<CheckIcon />}
                    sx={EmailHeaderStyles.markReadButton}
                >
                    Mark as Read
                </Button>
                <IconButton size="small" sx={EmailHeaderStyles.moreButton}>
                    <MoreVertIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default EmailHeader;
