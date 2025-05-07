import React from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

interface UploadImageModalProps {
    open: boolean;
    onClose: () => void;
    onBack: () => void;
    setPreviewImage: (img: { previewUrl: string; fileName: string; file: File }) => void;
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#2a2a33',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
    color: 'white',
};

const dropZoneStyle = {
    border: '2px dashed #505060',
    borderRadius: 2,
    padding: '30px 20px',
    textAlign: 'center' as const,
    mt: 2,
};

const UploadModal: React.FC<UploadImageModalProps> = ({ open, onClose, onBack, setPreviewImage }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage({
                previewUrl,
                fileName: file.name,
                file,
            });
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Box sx={{ display: "flex", alignContent: "center", gap: 1 }}>
                    <IconButton onClick={onBack} sx={{ color: 'white' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" marginTop={"6px"}>
                        Upload an Image
                    </Typography>
                </Box>

                <Box sx={dropZoneStyle}>
                    <CloudUploadOutlinedIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography color='#F7F7F8' fontSize="14px" fontWeight={400}>
                        Browse and choose the files you want to upload from your computer as an avatar
                    </Typography>

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    <Button
                        onClick={handleFileClick}
                        sx={{ mt: 2 }}
                        variant="contained"
                        color="warning"
                    >
                        <AddIcon />
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UploadModal;
