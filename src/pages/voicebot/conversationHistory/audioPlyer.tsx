import React, { useState, useRef, useEffect } from 'react';
import { Pause } from 'lucide-react';
import {
    Box,
    IconButton,
    Slider,
    Typography,
    Paper,
} from '@mui/material';
import {  PlayArrow } from '@mui/icons-material';

interface AudioPlayerProps {
    src: string;
    className?: string;
}

const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, className }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressChange = (_: Event, value: number | number[]) => {
        const audio = audioRef.current;
        if (!audio) return;
        const newTime = ((value as number) / 100) * duration;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <Paper
            elevation={2}
            sx={{
                display: 'flex',
                flexDirection: "column",
                padding: "8px 25px",
                borderRadius: 25,
                bgcolor: '#41414b',
                mb:3
            }}
            className={className}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flex: 1,
                    overflow: 'hidden',
                }}
            >

                <audio ref={audioRef} src={src} />

                <Box
                    sx={{
                        width: 25,
                        height: 25,
                        borderRadius: "50%",
                        backgroundColor: "#3d4047",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid  #9b9da4",
                    }}
                >
                    <IconButton sx={{ color: "#9b9da4" }} onClick={togglePlayPause} >
                        {isPlaying ? <Pause size={11} /> : <PlayArrow />}
                    </IconButton>
                </Box>

                <Slider
                    value={progress}
                    min={0}
                    max={100}
                    step={0.1}
                    onChange={handleProgressChange}
                    sx={{
                        color: '#FF581C',
                        flex: 1,
                        minWidth: 0,
                        '& .MuiSlider-thumb': {
                            width: 10,
                            height: 10,
                        },
                        '& .MuiSlider-rail': {
                            backgroundColor: '#2A2A33',
                            opacity: 1,
                            height: 4,
                        },
                        '& .MuiSlider-track': {
                            height: 4,
                        },
                    }}
                />
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: "space-between",
                gap: 1,
                flex: 1,
                overflow: 'hidden',
                color:"#FFFFFF"
            }}>
                <Typography
                    variant="caption"
                    sx={{ width: 32, flexShrink: 0, textAlign: 'right', ml: 3 }}
                >
                    {formatTime(currentTime)}
                </Typography>

                <Typography
                    variant="caption"
                    sx={{ width: 32, flexShrink: 0, textAlign: 'left' }}
                >
                    {formatTime(duration)}
                </Typography>
            </Box>
        </Paper>
    );
};

export default AudioPlayer;
