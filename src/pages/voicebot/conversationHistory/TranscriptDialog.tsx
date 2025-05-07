import {
    Dialog,
    DialogContent,
    IconButton,
    Typography,
    Box,
    Divider,
    Avatar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AudioPlayer from './audioPlyer';

interface TranscriptDialogProps {
    open: boolean;
    onClose: () => void;
    audioSrc: string;
    messages: any;
}
// #717B8B99 60%
const TranscriptDialog: React.FC<TranscriptDialogProps> = ({ open, onClose, audioSrc, messages }) => {
    return (
        <Dialog open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    m: 0,
                    height: '100vh',
                    maxHeight: '100vh',
                    width: 480,
                    ml: 'auto',
                    borderRadius: 0,
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}

        >
            <DialogContent
                sx={{
                    bgcolor: '#1e1e26',
                    color: '#fff',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    overflow: 'hidden',
                }}
            >
                <Box display="flex" alignItems="center">
                    <IconButton onClick={onClose} sx={{ color: '#fff' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="subtitle1">Recording & Chat Transcription</Typography>
                </Box>
                <Divider sx={{ bgcolor: '#444', mb: 2 }} />


                <AudioPlayer src={audioSrc} />


                <Box
                    sx={{
                        backgroundColor: "#41414b", borderRadius: 2, padding: "16px 16px 8px", height: '100vh',
                        maxHeight: '100vh',
                        flex: 1,
                        overflowY: 'auto',
                        pr: 1,
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >
                    <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 500, lineHeight: 2 }} >Chat Transcription</Typography>
                    <Divider sx={{ bgcolor: '#B8B9C1', mb: 1 }} />
                    {messages.map((msg:any, idx:any) => (
                        <Box key={idx} mb={1}>
                            {msg.time && (
                                <Typography variant="caption" display="block" align='center'>
                                    {msg.time}
                                </Typography>
                            )}

                            <Box
                                display="flex"
                                justifyContent={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                                alignItems="center"


                            >
                                {msg.sender === 'agent' && (
                                    <Avatar
                                        src={msg.avatarUrl}
                                        sx={{ width: 24, height: 24, mr: 1 }}
                                    />
                                )}

                                <Box
                                    sx={{
                                        bgcolor: msg.sender === 'user' ? '#fa5c2f' : '#4b4b4b',
                                        color: '#FFFFFF',
                                        px: 2,
                                        py: 1,
                                        borderRadius: '20px',
                                        maxWidth: '70%',
                                        fontSize: 16,
                                        fontWeight: 500,
                                        fontFamily: '"Poppins", sans-serif'
                                    }}
                                >
                                    <div>   {msg.text}</div>
                                </Box>

                                {msg.sender === 'user' && (
                                    <Avatar
                                        src={msg.avatarUrl}
                                        sx={{ width: 24, height: 24, ml: 1 }}
                                    />
                                )}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default TranscriptDialog;
